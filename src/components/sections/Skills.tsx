"use client";

/* eslint-disable @next/next/no-img-element --
 * Devicon icons are external SVGs; next/image refuses remote SVG unless
 * `dangerouslyAllowSVG` is enabled site-wide. Plain <img> keeps that off and
 * every chip still shows its text name if the icon fails to load. */

import { useState, type ComponentType } from "react";
import { Braces, Code2, Cpu, Database } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { Card } from "@/components/ui/Card";
import { containerClass } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  currentlyExploring,
  marqueeSkills,
  skillGroups,
  type SkillItem,
} from "@/data/skills";
import { cn } from "@/lib/utils";

const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

function deviconUrl(icon: string, variant?: string): string {
  return `${DEVICON_BASE}/${icon}/${icon}-${variant ?? "original"}.svg`;
}

type Accent = "violet" | "indigo" | "cyan";

const GROUP_ACCENTS: Record<string, Accent> = {
  "Programming Languages": "violet",
  "ML Libraries & Frameworks": "indigo",
  "Web Development": "cyan",
  "Databases & Tools": "violet",
};

const GROUP_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "Programming Languages": Code2,
  "ML Libraries & Frameworks": Cpu,
  "Web Development": Braces,
  "Databases & Tools": Database,
};

/** Icon-tile + hover classes per accent. */
const ACCENT_TILE: Record<Accent, string> = {
  violet: "border-accent-violet/35 bg-accent-violet/10 text-accent-violet",
  indigo: "border-accent-indigo/35 bg-accent-indigo/10 text-accent-indigo",
  cyan: "border-accent-cyan/35 bg-accent-cyan/10 text-accent-cyan",
};

/**
 * One skill chip: icon + name. If the skill has no icon, or the icon fails to
 * load, it degrades to a small accent dot plus the text label.
 */
function SkillChip({ skill }: { skill: SkillItem }) {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <li className="flex items-center gap-2 rounded-full border border-border bg-white/[0.02] px-3 py-1.5 text-sm text-muted transition-colors hover:border-border-hover hover:text-heading">
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
          className="size-1.5 shrink-0 rounded-full bg-accent-violet/60"
          aria-hidden
        />
      )}
      {skill.name}
    </li>
  );
}

/** One decorative marquee row; very wide so the -50% loop is seamless. */
function MarqueeRow({
  skills,
  reverse = false,
}: {
  skills: SkillItem[];
  reverse?: boolean;
}) {
  return (
    <div className="marquee marquee-mask relative overflow-hidden">
      <div
        className={cn("marquee-track flex w-max", reverse && "marquee-track--reverse")}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex gap-3 pr-3">
            {skills.map((skill) => (
              <SkillChip key={`${copy}-${skill.name}`} skill={skill} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/**
 * Skills: grouped grid, a two-row decorative icon marquee (pauses on hover,
 * frozen for reduced motion), and the "currently exploring" strip.
 */
export function Skills() {
  const midpoint = Math.ceil(marqueeSkills.length / 2);
  const rowOne = marqueeSkills.slice(0, midpoint);
  const rowTwo = marqueeSkills.slice(midpoint);

  return (
    <section
      id="skills"
      className={cn(containerClass, "py-24 md:py-32")}
      aria-labelledby="skills-heading"
    >
      <SectionHeading
        id="skills-heading"
        title="Skills"
        highlight="Skills"
        subtitle="The languages, libraries, and tools I reach for most, grouped by how I use them."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, index) => {
          const accent = GROUP_ACCENTS[group.title] ?? "violet";
          const Icon = GROUP_ICONS[group.title] ?? Code2;

          return (
            <Reveal key={group.title} delay={0.05 * index}>
              <Card interactive className="h-full p-5">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-xl border",
                      ACCENT_TILE[accent],
                    )}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <h3 className="font-heading text-base font-semibold text-heading">
                    {group.title}
                  </h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <SkillChip key={skill.name} skill={skill} />
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </div>

      {/* Decorative: duplicates the grid above, so it is hidden from assistive tech. */}
      <div className="mt-10 space-y-3" aria-hidden="true">
        <MarqueeRow skills={rowOne} />
        <MarqueeRow skills={rowTwo} reverse />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
        <p className="font-mono-label">Currently exploring</p>
        <ul className="flex flex-wrap gap-2">
          {currentlyExploring.map((item) => (
            <li
              key={item}
              className="rounded-full border border-accent-violet/25 bg-accent-violet/[0.08] px-3 py-1 text-xs text-accent-violet"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
