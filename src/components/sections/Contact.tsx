"use client";

import { ArrowUpRight, Copy } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/effects/Reveal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useToast } from "@/components/ui/Toast";
import { contactContent } from "@/data/contact";
import { profile } from "@/data/profile";
import { copyToClipboard } from "@/lib/utils";

const linkClass =
  "glass group flex items-center justify-between gap-4 rounded-2xl p-5 transition-colors hover:border-white/15";

/**
 * Contact: email + copy-to-clipboard, social links, and the contact form.
 */
export function Contact() {
  const { showToast } = useToast();

  const handleCopyEmail = async () => {
    const copied = await copyToClipboard(profile.email);
    showToast(copied ? "Email copied" : "Could not copy email");
  };

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mb-12 max-w-2xl">
        <p className="font-mono-label mb-3">
          <span className="text-accent-cyan">07</span>
          {" / Contact"}
        </p>
        <h2
          id="contact-heading"
          className="font-heading text-3xl font-semibold tracking-tight text-text sm:text-4xl"
        >
          {contactContent.heading}
        </h2>
        <p className="prose-width mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {contactContent.subheading}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <Reveal>
            <div className="glass rounded-2xl p-5">
              <p className="font-mono-label mb-3">Email</p>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="font-heading min-w-0 text-base break-all text-text transition-colors hover:text-accent-cyan"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="shrink-0 rounded-full border border-border p-2 text-muted transition-colors hover:border-white/20 hover:text-text"
                >
                  <Copy className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <span className="flex items-center gap-3">
                <GithubIcon className="size-5 text-text" />
                <span>
                  <span className="block text-sm font-medium text-text">
                    GitHub
                  </span>
                  <span className="block text-xs text-muted">
                    Code, experiments, and side projects
                  </span>
                </span>
              </span>
              <ArrowUpRight
                className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </Reveal>

          <Reveal delay={0.12}>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <span className="flex items-center gap-3">
                <LinkedinIcon className="size-5 text-text" />
                <span>
                  <span className="block text-sm font-medium text-text">
                    LinkedIn
                  </span>
                  <span className="block text-xs text-muted">
                    Experience and updates
                  </span>
                </span>
              </span>
              <ArrowUpRight
                className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
