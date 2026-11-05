import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/data/profile";
import { contactFormSchema } from "@/lib/validators";

/**
 * Simple in-memory rate limit (per server instance, resets on redeploy).
 * 5 submissions per IP per hour.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_TRACKED_CLIENTS = 5000;
const requestLog = new Map<string, number[]>();

function pruneRequestLog(now: number): void {
  if (requestLog.size <= MAX_TRACKED_CLIENTS) return;
  for (const [clientId, timestamps] of requestLog) {
    const last = timestamps[timestamps.length - 1];
    if (last === undefined || now - last >= WINDOW_MS) {
      requestLog.delete(clientId);
    }
  }
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(clientId) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    requestLog.set(clientId, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(clientId, recent);
  pruneRequestLog(now);
  return false;
}

function getClientId(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0];
    if (first && first.trim()) return first.trim();
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** The honeypot must stay empty; a filled value means a bot. */
function hasHoneypotValue(body: unknown): boolean {
  if (typeof body !== "object" || body === null) return false;
  const value = (body as { website?: unknown }).website;
  return typeof value === "string" && value.trim().length > 0;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

type MessageFields = {
  email: string;
  subject: string;
  message: string;
};

function buildHtml(fields: MessageFields): string {
  return `<div style="background:#0B0B0E;padding:24px;font:14px Arial,sans-serif;color:#E4E4E7;">
<h1 style="margin:0 0 4px;font-size:18px;">New portfolio message</h1>
<p style="margin:0 0 16px;color:#9A9AA8;font-size:13px;">Sent from the contact form on ${escapeHtml(
    profile.name,
  )}'s portfolio.</p>
<table style="border-collapse:collapse;margin-bottom:16px;"><tr><td style="padding:4px 16px 4px 0;color:#9A9AA8;font:600 13px Arial,sans-serif;vertical-align:top;">Email</td><td style="padding:4px 0;color:#E4E4E7;font:13px Arial,sans-serif;">${escapeHtml(
    fields.email,
  )}</td></tr></table>
<div style="border-top:1px solid rgba(168,85,247,0.28);padding-top:16px;white-space:pre-wrap;">${escapeHtml(
    fields.message,
  )}</div>
</div>`;
}

function buildText(fields: MessageFields): string {
  return [
    "New portfolio message",
    "",
    `Email: ${fields.email}`,
    "",
    fields.message,
  ].join("\n");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "That request couldn't be read. Please try again." },
      { status: 400 },
    );
  }

  // Silently accept honeypot hits so bots don't learn anything.
  if (hasHoneypotValue(body)) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  if (isRateLimited(getClientId(request))) {
    return NextResponse.json(
      { error: "Too many messages from this address. Please try again later." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.warn(
      "[contact] Email is not configured — RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL must all be set. Message not sent.",
    );
    return NextResponse.json(
      {
        error:
          "The contact form is temporarily unavailable. Please email me directly instead.",
      },
      { status: 500 },
    );
  }

  const { email, subject, message } = parsed.data;
  const fields: MessageFields = { email, subject, message };

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject,
      html: buildHtml(fields),
      text: buildText(fields),
    });

    if (result.error) {
      console.error(
        "[contact] Resend rejected the message:",
        result.error.message,
      );
      return NextResponse.json(
        { error: "The message couldn't be sent. Please try again." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error(
      "[contact] Unexpected error while sending mail:",
      error instanceof Error ? error.message : "unknown error",
    );
    return NextResponse.json(
      { error: "The message couldn't be sent. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
