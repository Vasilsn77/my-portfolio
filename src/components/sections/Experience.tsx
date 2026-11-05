"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Check } from "lucide-react";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/effects/Reveal";
import { Card } from "@/components/ui/Card";
import { containerClass } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * Vertical experience timeline: a gradient rail that draws on scroll,
 * gradient company badges, tinted tech chips and check-marked bullets.
 */
export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lineRef, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className={cn(containerClass, "py-24 md:py-32")}
      aria-labelledby="experience-heading"
    >
      <SectionHeading
        id="experience-heading"
        title="My Experience"
        highlight="Experience"
        subtitle="Roles and research work, newest first."
      />

      <div
        ref={lineRef}
        className="relative mt-12 ml-3 space-y-10 pl-8 sm:ml-4"
      >
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-px origin-top bg-[linear-gradient(180deg,#A855F7,#4F6FEF_60%,transparent)]"
          initial={{ scaleY: reducedMotion ? 1 : 0 }}
          animate={{ scaleY: inView || reducedMotion ? 1 : 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />

        {experience.map((item, index) => (
          <Reveal key={item.id} delay={0.08 * index} as="article">
            <div className="relative">
              <span
                className="absolute -left-[38px] top-1 flex size-9 items-center justify-center rounded-xl border border-accent-violet/35 bg-[linear-gradient(135deg,rgba(168,85,247,0.28),rgba(79,111,239,0.28))] font-mono text-[9px] font-semibold tracking-wide text-heading sm:-left-[40px]"
                aria-hidden
              >
                {item.companyShort.slice(0, 3)}
              </span>

              <Card interactive className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading text-xl text-heading">
                    {item.title}
                  </h3>
                  {item.statusChip ? (
                    <span className="rounded-full border border-accent-emerald/30 bg-accent-emerald/10 px-2.5 py-0.5 text-xs text-accent-emerald">
                      {item.statusChip}
                    </span>
                  ) : null}
                </div>

                <p className="mt-1 text-sm text-secondary">
                  {item.company}
                  <span className="mx-2 text-muted/60">·</span>
                  {item.location}
                </p>
                <p className="font-mono-label mt-2">{item.dates}</p>

                {item.projectTitle ? (
                  <p className="mt-4 text-sm font-medium text-heading">
                    {item.projectTitle}
                  </p>
                ) : null}

                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {item.summary}
                </p>

                {item.bullets && item.bullets.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-secondary"
                      >
                        <Check
                          className="mt-1 size-3.5 shrink-0 text-accent-violet"
                          aria-hidden
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {item.tags && item.tags.length > 0 ? (
                  <ul
                    className="mt-5 flex flex-wrap gap-2"
                    aria-label="Technologies"
                  >
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-accent-indigo/25 bg-accent-indigo/10 px-2.5 py-1 text-xs text-secondary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
