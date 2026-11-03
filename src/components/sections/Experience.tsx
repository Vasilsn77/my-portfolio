"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { experience } from "@/data/experience";
import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/**
 * Vertical experience timeline with a line that draws on scroll.
 */
export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(lineRef, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 md:py-32"
      aria-labelledby="experience-heading"
    >
      <SectionHeading
        index="02"
        title="Experience"
        headingId="experience-heading"
        description="Roles and research work, newest first."
      />

      <div ref={lineRef} className="relative ml-3 space-y-10 border-l border-transparent pl-8 sm:ml-4">
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-px origin-top bg-[linear-gradient(180deg,#22D3EE,#8B5CF6_60%,transparent)]"
          initial={{ scaleY: reducedMotion ? 1 : 0 }}
          animate={{ scaleY: inView || reducedMotion ? 1 : 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />

        {experience.map((item, index) => (
          <Reveal key={item.id} delay={0.08 * index} as="article">
            <div className="relative">
              <span
                className="absolute -left-[39px] top-1 flex size-8 items-center justify-center rounded-full border border-border bg-surface text-[10px] font-semibold tracking-wide text-text sm:-left-[41px]"
                aria-hidden
              >
                <span className="bg-[linear-gradient(135deg,#0B0D14,#11141D)] absolute inset-0 rounded-full" />
                <span className="relative bg-[linear-gradient(135deg,rgba(34,211,238,0.25),rgba(139,92,246,0.25))] flex size-full items-center justify-center rounded-full font-mono text-[9px]">
                  {item.companyShort.slice(0, 3)}
                </span>
              </span>

              <div className="glass rounded-2xl p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-heading text-xl text-text">{item.title}</h3>
                  {item.statusChip ? (
                    <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-2.5 py-0.5 text-xs text-accent-cyan">
                      {item.statusChip}
                    </span>
                  ) : null}
                </div>

                <p className="mt-1 text-sm text-muted">
                  {item.company}
                  <span className="mx-2 text-border">·</span>
                  {item.location}
                </p>
                <p className="font-mono-label mt-2">{item.dates}</p>

                {item.projectTitle ? (
                  <p className="mt-4 text-sm font-medium text-text">
                    {item.projectTitle}
                  </p>
                ) : null}

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>

                {item.bullets && item.bullets.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-violet"
                          aria-hidden
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {item.tags && item.tags.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className={cn(
                          "rounded-full border border-border px-2.5 py-1 text-xs text-muted",
                        )}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
