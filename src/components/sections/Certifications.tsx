"use client";

import { ArrowUpRight, Award, Trophy } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { Card } from "@/components/ui/Card";
import { containerClass } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements, certifications } from "@/data/certifications";
import { cn } from "@/lib/utils";

/**
 * Certifications & achievements.
 * Achievements come from `src/data/certifications.ts`; certification titles
 * are placeholders there until confirmed and are rendered as-is (never invented).
 */
export function Certifications() {
  return (
    <section
      id="certifications"
      className={cn(containerClass, "py-24 md:py-32")}
      aria-labelledby="certifications-heading"
    >
      <SectionHeading
        id="certifications-heading"
        title="Certifications & Achievements"
        highlight="Achievements"
        subtitle="Courses and assessments I've completed, plus a few milestones worth calling out."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {achievements.map((achievement, index) => (
          <Reveal key={achievement.id} delay={0.05 * index}>
            <Card interactive className="flex h-full items-center gap-4 p-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-accent-gold/35 bg-accent-gold/10">
                <Trophy className="size-6 text-accent-gold" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="font-heading text-gradient block text-2xl font-bold">
                  {achievement.value}
                </span>
                <span className="mt-0.5 block text-xs leading-snug text-muted">
                  {achievement.caption}
                </span>
              </span>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <Reveal key={cert.id} delay={0.05 * index}>
            <Card interactive className="flex h-full flex-col p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-accent-violet/35 bg-accent-violet/10">
                <Award className="size-5 text-accent-violet" aria-hidden />
              </span>

              <h3 className="font-heading mt-4 text-base leading-snug font-semibold text-heading">
                {cert.title}
              </h3>

              <p className="mt-1 text-sm text-muted">{cert.issuer}</p>

              {cert.titleIsPlaceholder ? (
                <p className="mt-1.5 text-xs text-muted italic">
                  Exact title to be confirmed.
                </p>
              ) : null}

              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-heading transition-colors hover:text-accent-violet"
              >
                Verify
                <ArrowUpRight className="size-4" aria-hidden />
                <span className="sr-only">
                  {cert.title} on {cert.issuer}
                </span>
              </a>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
