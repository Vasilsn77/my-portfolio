"use client";

import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";

/**
 * Certifications with external verify links.
 * Titles are placeholders in `src/data/certifications.ts` until confirmed —
 * they are rendered as-is (no invented titles) with a quiet note.
 */
export function Certifications() {
  return (
    <section
      id="certifications"
      className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 md:py-32"
      aria-labelledby="certifications-heading"
    >
      <SectionHeading
        index="06"
        title="Certifications"
        headingId="certifications-heading"
        description="Courses and assessments I've completed, each with a verifiable link."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <Reveal key={cert.id} delay={0.05 * index}>
            <article className="glass flex h-full flex-col rounded-2xl p-5">
              <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-border px-2.5 py-1 text-[11px] text-muted">
                <ShieldCheck className="size-3.5" aria-hidden />
                {cert.issuer}
              </span>

              <h3 className="font-heading mt-4 text-base leading-snug font-semibold text-text">
                {cert.title}
              </h3>

              {cert.titleIsPlaceholder ? (
                <p className="mt-1.5 text-xs text-muted italic">
                  Exact title to be confirmed.
                </p>
              ) : null}

              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-text transition-colors hover:text-accent-cyan"
              >
                Verify
                <ArrowUpRight className="size-4" aria-hidden />
                <span className="sr-only">
                  {cert.title} on {cert.issuer}
                </span>
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
