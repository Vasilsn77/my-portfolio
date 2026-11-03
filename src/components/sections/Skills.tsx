"use client";

/* eslint-disable @next/next/no-img-element --
 * Devicon icons are external SVGs; next/image refuses remote SVG unless
 * `dangerouslyAllowSVG` is enabled site-wide. Plain <img> keeps that off and
 * every chip still shows its text name if the icon fails to load. */

import { useState } from "react";
import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  currentlyExploring,
  marqueeSkills,
  skillGroups,
  type SkillItem,
} from "@/data/skills";

const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

function deviconUrl(icon: string, variant?: string): string {
  return `${DEVICON_BASE}/${icon}/${icon}-${variant ?? "original"}.svg`;
}

/**
 * One skill chip: icon + name. If the skill has no icon, or the icon fails to
 * load, it degrades to a small accent dot plus the text label.
 */
function SkillChip({ skill }: { skill: SkillItem }) {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <li className="flex items-center gap-2 rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-muted transition-colors hover:border-white/15 hover:text-text">
      {skill.icon && !iconFailed ? (
        <img
          src={deviconUrl(skill.icon, skill.iconVariant)}
          alt=""
          width={16}
          height={16}
          loading="lazy"
          decoding="async"
          className="size-4 shrink-0"
          onError={() => setIconFailed(true)}
        />
      ) : (
        <span
          className="size-1.5 shrink-0 rounded-full bg-accent-cyan/60"
          aria-hidden
        />
      )}
      {skill.name}
    </li>
  );
}

/**
 * Skills: grouped grid, a decorative icon marquee (pauses on hover, hidden for
 * reduced motion), and the "currently exploring" strip.
 */
export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 md:py-32"
      aria-labelledby="skills-heading"
    >
      <SectionHeading
        index="05"
        title="Skills"
        headingId="skills-heading"
        description="The languages, libraries, and tools I reach for most, grouped by how I use them."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={0.05 * index}>
            <div className="glass h-full rounded-2xl p-5">
              <h3 className="font-heading text-base font-semibold text-text">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Decorative: duplicates the grid above, so it is hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="marquee relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]"
      >
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex gap-3 pr-3">
              {marqueeSkills.map((skill) => (
                <SkillChip key={`${copy}-${skill.name}`} skill={skill} />
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
        <p className="font-mono-label">Currently exploring</p>
        <ul className="flex flex-wrap gap-2">
          {currentlyExploring.map((item) => (
            <li
              key={item}
              className="rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.06] px-3 py-1 text-xs text-accent-cyan"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
