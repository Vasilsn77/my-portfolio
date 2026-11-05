"use client";

import Image from "next/image";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { ArrowDownRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MonogramOrb } from "@/components/ui/MonogramOrb";
import { TextScramble } from "@/components/ui/TextScramble";
import { TypewriterRoles } from "@/components/ui/TypewriterRoles";
import { containerClass } from "@/components/ui/Container";
import { useImageAvailable } from "@/lib/hooks/use-image-available";
import { scrollToTarget } from "@/lib/scroll";
import { Reveal } from "@/components/effects/Reveal";
import { cn } from "@/lib/utils";

type CodeEntry = (typeof profile.codeCard.entries)[number];

/** Monospace value renderer for the hero code window (decorative). */
function CodeValue({ entry }: { entry: CodeEntry }) {
  if (entry.type === "array") {
    return (
      <>
        <span className="text-muted">[</span>
        {entry.value.map((item, index) => (
          <span key={item}>
            {index > 0 ? <span className="text-muted">, </span> : null}
            <span className="text-accent-cyan">&quot;{item}&quot;</span>
          </span>
        ))}
        <span className="text-muted">]</span>
      </>
    );
  }

  if (entry.type === "boolean") {
    return <span className="text-accent-emerald">{String(entry.value)}</span>;
  }

  return <span className="text-accent-cyan">&quot;{entry.value}&quot;</span>;
}

/** Decorative editor window rendered from `profile.codeCard`. */
function CodeWindow({ className }: { className?: string }) {
  const { filename, varName, entries } = profile.codeCard;

  return (
    <div className={cn("card overflow-hidden", className)} aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-muted">{filename}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-secondary sm:text-[13px]">
        <code>
          <span className="text-accent-violet">const</span>{" "}
          <span className="text-heading">{varName}</span>{" "}
          <span className="text-muted">= {"{"}</span>
          {"\n"}
          {entries.map((entry) => (
            <span key={entry.key}>
              {"  "}
              <span className="text-secondary">{entry.key}</span>
              <span className="text-muted">: </span>
              <CodeValue entry={entry} />
              <span className="text-muted">,</span>
              {"\n"}
            </span>
          ))}
          <span className="text-muted">{"}"};</span>
        </code>
      </pre>
    </div>
  );
}

/**
 * Hero: scramble name, rotating roles, CTAs, availability pill, a portrait in
 * a gradient frame, and a decorative code-window card.
 *
 * `cvAvailable` is resolved on the server so the CV button degrades to the
 * resume page (which shows a friendly "coming soon" state) instead of 404ing.
 */
export function Hero({ cvAvailable }: { cvAvailable: boolean }) {
  const lenis = useLenis();
  const photoOk = useImageAvailable(profile.photoSrc);

  return (
    <section
      id="hero"
      className={cn(
        containerClass,
        "relative flex flex-col gap-12 pt-28 pb-20 md:pt-36 lg:min-h-[100svh] lg:flex-row lg:items-center lg:gap-16 lg:pb-28",
      )}
      aria-labelledby="hero-heading"
    >
      <div className="flex-1">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-emerald opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-emerald" />
            </span>
            {profile.availabilityPill}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="font-mono-label mb-3">{profile.statusLine}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            id="hero-heading"
            className="font-heading text-4xl font-bold tracking-tight text-heading sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <TextScramble text={profile.name} />
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-3 text-lg text-secondary sm:text-xl">
            <TypewriterRoles roles={profile.heroRoles} className="text-heading" />
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="prose-width mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {profile.headline}. Based in {profile.location}. {profile.seeking}
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="#contact"
              className="gradient-border"
              onClick={(event) => {
                event.preventDefault();
                scrollToTarget("#contact", lenis ?? null);
              }}
            >
              Contact Me
              <ArrowDownRight className="size-4" aria-hidden />
            </MagneticButton>

            {cvAvailable ? (
              <a
                href="/resume/download"
                download="Vasil_S_N_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-heading transition-colors hover:border-border-hover hover:bg-white/5"
              >
                <Download className="size-4" aria-hidden />
                Download Resume
              </a>
            ) : (
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-heading transition-colors hover:border-border-hover hover:bg-white/5"
              >
                <Download className="size-4" aria-hidden />
                Resume
              </Link>
            )}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.18} className="mx-auto w-full max-w-md flex-1 lg:mx-0">
        <div className="relative">
          <div className="gradient-border relative aspect-square overflow-hidden rounded-[2rem] border border-border bg-surface">
            {photoOk ? (
              <Image
                src={profile.photoSrc}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover"
              />
            ) : (
              <MonogramOrb className="max-w-none rounded-none" />
            )}
          </div>

          <CodeWindow className="relative z-10 mx-2 -mt-14 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)] sm:mx-4 sm:-mt-16" />
        </div>
      </Reveal>
    </section>
  );
}
