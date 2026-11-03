"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CircleAlert,
  CircleCheck,
  LoaderCircle,
  Send,
} from "lucide-react";
import { contactContent } from "@/data/contact";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import { contactFormSchema } from "@/lib/validators";

type TextFieldName = "name" | "email" | "subject" | "message" | "company";
type FormValues = Record<TextFieldName | "website", string>;
type FormErrors = Partial<Record<TextFieldName | "website", string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY_VALUES: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
  website: "",
};

const FIELDS: Array<{
  name: TextFieldName;
  label: string;
  type: string;
  autoComplete?: string;
  optional?: boolean;
  textarea?: boolean;
  full?: boolean;
}> = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", full: true },
  { name: "message", label: "Message", type: "text", textarea: true, full: true },
  {
    name: "company",
    label: "Company",
    type: "text",
    autoComplete: "organization",
    optional: true,
  },
];

const inputClass = cn(
  "w-full rounded-xl border border-border bg-white/[0.03] px-3.5 py-2.5 text-sm text-text",
  "transition-colors placeholder:text-muted/70 focus:border-accent-cyan/60",
);

const errorTextClass = "mt-1.5 text-xs text-red-400";
const fieldId = (name: string) => `contact-${name}`;

/**
 * Contact form: validated with Zod on the client, re-validated on the server.
 * Includes a hidden honeypot, inline errors, loading / success / error states.
 */
export function ContactForm() {
  const reducedMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => {
      if (!previous[name as keyof FormErrors]) return previous;
      const next = { ...previous };
      delete next[name as keyof FormErrors];
      return next;
    });
  };

  const submit = async () => {
    setStatus("submitting");
    setServerError(null);

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !nextErrors[key as keyof FormErrors]) {
          nextErrors[key as keyof FormErrors] = issue.message;
        }
      }
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const data: unknown = await response.json().catch(() => null);
        const message =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error: unknown }).error === "string"
            ? (data as { error: string }).error
            : contactContent.errorMessage;
        setServerError(message);
        setStatus("error");
        return;
      }

      setValues(EMPTY_VALUES);
      setStatus("success");
    } catch {
      setServerError(contactContent.errorMessage);
      setStatus("error");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit();
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={transition}
          role="status"
          className="glass flex flex-col items-start gap-4 rounded-2xl p-6 sm:p-8"
        >
          <span className="inline-flex size-11 items-center justify-center rounded-full border border-accent-emerald/40 bg-accent-emerald/10">
            <CircleCheck className="size-5 text-accent-emerald" aria-hidden />
          </span>
          <p className="font-heading text-lg text-text">
            {contactContent.successMessage}
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm font-medium text-accent-cyan transition-colors hover:text-text"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={transition}
          className="glass rounded-2xl p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            {FIELDS.map((field) => {
              const error = errors[field.name];
              const describedBy = error ? `${fieldId(field.name)}-error` : undefined;

              return (
                <div key={field.name} className={field.full ? "sm:col-span-2" : undefined}>
                  <label
                    htmlFor={fieldId(field.name)}
                    className="font-mono-label mb-2 block"
                  >
                    {field.label}
                    {field.optional ? (
                      <span className="ml-1.5 tracking-normal normal-case">
                        (optional)
                      </span>
                    ) : null}
                  </label>

                  {field.textarea ? (
                    <textarea
                      id={fieldId(field.name)}
                      name={field.name}
                      rows={5}
                      value={values[field.name]}
                      onChange={handleChange}
                      aria-invalid={Boolean(error)}
                      aria-describedby={describedBy}
                      placeholder="Tell me a little about the role or project…"
                      className={cn(inputClass, "resize-y")}
                    />
                  ) : (
                    <input
                      id={fieldId(field.name)}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      value={values[field.name]}
                      onChange={handleChange}
                      aria-invalid={Boolean(error)}
                      aria-describedby={describedBy}
                      className={inputClass}
                    />
                  )}

                  {error ? (
                    <p id={`${fieldId(field.name)}-error`} className={errorTextClass}>
                      {error}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* Honeypot — must stay empty. Hidden from users and assistive tech. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-9999px] size-px overflow-hidden"
          >
            <label htmlFor={fieldId("website")}>Website</label>
            <input
              id={fieldId("website")}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={handleChange}
            />
          </div>

          {status === "error" ? (
            <div
              role="alert"
              className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              <CircleAlert className="size-4 shrink-0" aria-hidden />
              <span>{serverError ?? contactContent.errorMessage}</span>
              <button
                type="button"
                onClick={() => formRef.current?.requestSubmit()}
                className="font-medium text-text underline underline-offset-4 transition-colors hover:text-accent-cyan"
              >
                Try again
              </button>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className={cn(
              "mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium",
              "bg-[linear-gradient(135deg,#22D3EE,#8B5CF6)] text-[#05060A]",
              "transition-opacity disabled:cursor-not-allowed disabled:opacity-60",
            )}
          >
            {status === "submitting" ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden />
            ) : (
              <Send className="size-4" aria-hidden />
            )}
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>

          <p className="mt-4 text-xs text-muted">
            Your details are only used to reply to this message.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
