"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { ArrowDownRight, Download } from "lucide-react";
import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MonogramOrb } from "@/components/ui/MonogramOrb";
import { TextScramble } from "@/components/ui/TextScramble";
import { TypewriterRoles } from "@/components/ui/TypewriterRoles";
import { scrollToTarget } from "@/lib/scroll";
import { Reveal } from "@/components/effects/Reveal";

/**
 * Hero: scramble name, rotating roles, CTAs, availability pill,
 * and photo-or-monogram visual.
 *
 * `cvAvailable` is resolved on the server so the CV button degrades to the
 * resume page (which shows a friendly "coming soon" state) instead of 404ing.
 */
export function Hero({ cvAvailable }: { cvAvailable: boolean }) {
  const lenis = useLenis();
  // Start false so a missing /images/me.jpg never hits next/image.
  const [photoOk, setPhotoOk] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setPhotoOk(true);
    img.onerror = () => setPhotoOk(false);
    img.src = profile.photoSrc;
  }, []);

  return (
    <section
      id="hero"
      className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-4 pb-20 pt-28 sm:px-6 md:pt-36 lg:min-h-[100svh] lg:flex-row lg:items-center lg:gap-16 lg:pb-28"
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
            className="font-heading text-4xl font-semibold tracking-tight text-text sm:text-5xl md:text-6xl"
          >
            <TextScramble text={profile.name} />
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-3 text-lg text-muted sm:text-xl">
            <TypewriterRoles roles={profile.heroRoles} className="text-text" />
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="prose-width mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {profile.headline}. Based in {profile.location}.{" "}
            {profile.seeking}
          </p>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="#contact"
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
                href={profile.cvSrc}
                download
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-text transition-colors hover:bg-white/5"
              >
                <Download className="size-4" aria-hidden />
                Download CV
              </a>
            ) : (
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm text-text transition-colors hover:bg-white/5"
              >
                <Download className="size-4" aria-hidden />
                Resume
              </Link>
            )}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.18} className="mx-auto w-full max-w-md flex-1 lg:mx-0">
        {photoOk ? (
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border">
            <Image
              src={profile.photoSrc}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 420px"
              className="object-cover"
              onError={() => setPhotoOk(false)}
            />
          </div>
        ) : (
          <MonogramOrb />
        )}
      </Reveal>
    </section>
  );
}
