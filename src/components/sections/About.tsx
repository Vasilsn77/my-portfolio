"use client";

import Image from "next/image";
import { Fragment } from "react";
import {
  BookOpen,
  Check,
  GraduationCap,
  School,
  Sparkles,
} from "lucide-react";
import { profile, type EducationItem } from "@/data/profile";
import { Reveal } from "@/components/effects/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Card } from "@/components/ui/Card";
import { containerClass } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/Logo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useImageAvailable } from "@/lib/hooks/use-image-available";
import { cn } from "@/lib/utils";

/** Phrases rendered in the accent color inside the bio copy. */
const BIO_HIGHLIGHTS = ["PES University", "full-stack", "generative AI", "AI agents"];

const EDU_ICONS = { GraduationCap, BookOpen, School } as const;

const EDU_ACCENTS: Record<
  EducationItem["accent"],
  { tile: string; chip: string }
> = {
  violet: {
    tile: "border-accent-violet/30 bg-accent-violet/15 text-accent-violet",
    chip: "border-accent-violet/30 bg-accent-violet/10 text-accent-violet",
  },
  indigo: {
    tile: "border-accent-indigo/30 bg-accent-indigo/15 text-accent-indigo",
    chip: "border-accent-indigo/30 bg-accent-indigo/10 text-accent-indigo",
  },
  cyan: {
    tile: "border-accent-cyan/30 bg-accent-cyan/15 text-accent-cyan",
    chip: "border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan",
  },
};

/** Wraps any known phrases in the bio with the accent treatment. */
function HighlightedText({ text }: { text: string }) {
  const escaped = BIO_HIGHLIGHTS.map((phrase) =>
    phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));

  return (
    <>
      {parts.map((part, index) =>
        BIO_HIGHLIGHTS.includes(part) ? (
          <span key={index} className="font-semibold text-accent-violet">
            {part}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Tall portrait card: real photo when present, generated art otherwise. */
function AboutPortrait() {
  const photoAvailable = useImageAvailable(profile.photoSrc);

  return (
    <Card interactive className="h-full p-3.5">
      <div className="relative h-full min-h-[420px] overflow-hidden rounded-[18px] border border-border/60">
        {photoAvailable ? (
          <Image
            src={profile.photoSrc}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="(max-width: 1024px) 90vw, 420px"
            className="object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            aria-label={`${profile.name} portrait placeholder`}
            role="img"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 28% 22%, rgba(168,85,247,0.42), transparent 46%), radial-gradient(circle at 74% 74%, rgba(79,111,239,0.4), transparent 52%), #111114",
              }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),transparent_42%)]" />
            <div className="font-mono absolute inset-6 flex flex-col justify-between text-[10px] leading-relaxed text-muted/40">
              <span>{"// build · ship · learn"}</span>
              <span>{"const focus = ['ai', 'agents'];"}</span>
            </div>
            <div className="relative flex h-full items-center justify-center">
              <LogoMark className="size-24 opacity-90" />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function EducationCard({ item }: { item: EducationItem }) {
  const Icon = EDU_ICONS[item.icon];
  const accent = EDU_ACCENTS[item.accent];

  return (
    <Card interactive className="flex h-full flex-col p-6">
      <span
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-xl border",
          accent.tile,
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <h4 className="font-heading mt-4 text-base font-semibold text-heading">
        {item.school}
      </h4>
      <p className="mt-1 text-sm leading-relaxed text-secondary">
        {item.detail}
      </p>
      <p className="font-mono mt-2 text-xs tracking-wider text-muted">
        {item.years}
      </p>
      {item.result ? (
        <span
          className={cn(
            "mt-4 inline-flex self-start rounded-full border px-3 py-1 text-xs font-medium",
            accent.chip,
          )}
        >
          {item.result}
        </span>
      ) : null}
    </Card>
  );
}

/**
 * About: tall portrait card, bio, "Right now", the 2x3 stats grid,
 * the education cards, and a closing fun-fact line.
 */
export function About() {
  return (
    <section
      id="about"
      className={cn(containerClass, "py-24 md:py-32")}
      aria-labelledby="about-heading"
    >
      <SectionHeading
        id="about-heading"
        title="About Me"
        highlight="Me"
        subtitle="Who I am, what I’m focused on, and the path that got me here."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <AboutPortrait />
        </Reveal>

        <div className="flex flex-col gap-6 lg:col-span-7">
          <Reveal delay={0.06}>
            <Card className="p-6 sm:p-8">
              {profile.aboutBio.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className={cn(
                    "leading-relaxed",
                    index === 0
                      ? "text-lg text-heading sm:text-xl"
                      : "mt-5 text-base text-secondary sm:text-lg",
                  )}
                >
                  <HighlightedText text={paragraph} />
                </p>
              ))}
            </Card>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal delay={0.1}>
              <Card interactive className="h-full p-6">
                <p className="font-mono-label mb-2 inline-flex items-center gap-2">
                  <Sparkles className="size-3.5" aria-hidden />
                  {profile.rightNow.heading}
                </p>
                <p className="font-heading text-lg text-heading">
                  {profile.rightNow.intro}
                </p>
                <ul className="mt-4 space-y-3">
                  {profile.rightNow.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-sm leading-relaxed text-secondary"
                    >
                      <span
                        className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-accent-violet/30 bg-accent-violet/15 text-accent-violet"
                        aria-hidden
                      >
                        <Check className="size-3" />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            <Reveal delay={0.14}>
              <Card interactive className="h-full p-6">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
                  {profile.stats.map((stat) => (
                    <div key={stat.label}>
                      <dd className="font-heading text-xl font-bold sm:text-2xl">
                        {stat.kind === "number" ? (
                          <span className="text-gradient">
                            <AnimatedCounter
                              value={stat.value}
                              decimals={stat.decimals ?? 0}
                              suffix={stat.suffix ?? ""}
                            />
                          </span>
                        ) : (
                          <span className="text-gradient">{stat.value}</span>
                        )}
                      </dd>
                      <dt className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">
                        {stat.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <Reveal>
          <h3 className="font-heading mb-6 text-xl text-heading">Education</h3>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {profile.education.map((item, index) => (
            <Reveal key={item.school} delay={0.06 * index} className="h-full">
              <EducationCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.05}>
        <p className="mt-10 inline-flex items-center gap-2 text-sm text-muted">
          <Sparkles className="size-4 text-accent-violet" aria-hidden />
          <span className="italic">{profile.funFact}</span>
        </p>
      </Reveal>
    </section>
  );
}
