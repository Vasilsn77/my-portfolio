"use client";

import { ArrowUpRight, Copy, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/effects/Reveal";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Card } from "@/components/ui/Card";
import { containerClass } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useToast } from "@/components/ui/Toast";
import { contactContent } from "@/data/contact";
import { profile } from "@/data/profile";
import { cn, copyToClipboard } from "@/lib/utils";

const socialLinkClass =
  "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-text transition-colors hover:border-border-hover hover:text-heading";

/**
 * Contact: heading + email + socials on the left, the form in a Card on the
 * right, with a soft violet glow anchored to the bottom-left of the section.
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
      className={cn(containerClass, "relative py-24 md:py-32")}
      aria-labelledby="contact-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 -z-10 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18),transparent_70%)] blur-3xl"
      />

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="contact-heading"
            align="left"
            eyebrow="Contact"
            title={contactContent.heading}
            highlight={contactContent.headingHighlight}
            subtitle={contactContent.subheading}
          />

          <Reveal delay={0.06}>
            <Card interactive className="p-5">
              <p className="font-mono-label mb-3 flex items-center gap-2">
                <Mail className="size-3.5" aria-hidden />
                Email
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="font-heading min-w-0 text-base break-all text-heading transition-colors hover:text-accent-violet"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="shrink-0 rounded-full border border-border p-2 text-muted transition-colors hover:border-border-hover hover:text-heading"
                >
                  <Copy className="size-4" aria-hidden />
                </button>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={socialLinkClass}
              >
                <LinkedinIcon className="size-4" />
                LinkedIn
              </a>
              <a
                href="/resume"
                className={socialLinkClass}
              >
                Resume
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
