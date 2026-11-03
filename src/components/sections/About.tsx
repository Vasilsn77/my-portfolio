"use client";

import { profile } from "@/data/profile";
import { Reveal } from "@/components/effects/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * About: bio, Right now card, animated stats, education timeline.
 */
export function About() {
  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 md:py-32"
      aria-labelledby="about-heading"
    >
      <SectionHeading
        index="01"
        title="About"
        headingId="about-heading"
        description="A short look at who I am, what I’m focused on, and the path that got me here."
      />

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          {profile.aboutBio.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={0.05 * index}>
              <p className="prose-width mb-5 text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <p className="prose-width border-l-2 border-accent-cyan/40 pl-4 text-sm italic text-muted">
              {profile.funFact}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <aside className="glass rounded-2xl p-6">
            <p className="font-mono-label mb-2">{profile.rightNow.heading}</p>
            <p className="font-heading mb-4 text-lg text-text">
              {profile.rightNow.intro}
            </p>
            <ul className="space-y-3">
              {profile.rightNow.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-sm leading-relaxed text-muted"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-cyan"
                    aria-hidden
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
        {profile.stats.map((stat, index) => (
          <Reveal key={stat.label} delay={0.06 * index}>
            <div className="glass rounded-2xl p-5">
              <p className="font-heading text-2xl font-semibold text-text sm:text-3xl">
                {stat.kind === "number" ? (
                  <AnimatedCounter
                    value={stat.value}
                    decimals={stat.decimals ?? 0}
                    suffix={stat.suffix ?? ""}
                  />
                ) : (
                  <span className="text-gradient">{stat.value}</span>
                )}
              </p>
              <p className="mt-2 text-xs leading-snug text-muted sm:text-sm">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <Reveal>
          <h3 className="font-heading mb-8 text-xl text-text">Education</h3>
        </Reveal>
        <ol className="relative space-y-8 border-l border-border pl-6">
          {profile.education.map((item, index) => (
            <Reveal key={item.school} delay={0.08 * index} as="li">
              <span
                className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full bg-[linear-gradient(135deg,#22D3EE,#8B5CF6)]"
                aria-hidden
              />
              <p className="font-mono-label mb-1">{item.years}</p>
              <p className="font-heading text-lg text-text">{item.school}</p>
              <p className="text-sm text-muted">{item.detail}</p>
              {item.result ? (
                <p className="mt-1 text-sm text-accent-cyan">{item.result}</p>
              ) : null}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
