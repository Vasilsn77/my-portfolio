"use client";

import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import { scrollToTarget } from "@/lib/scroll";

/**
 * Site footer: socials, copyright, and a back-to-top control.
 */
export function Footer() {
  const lenis = useLenis();

  const socialLinkClass =
    "rounded-full border border-border p-2.5 text-muted transition-colors hover:border-white/20 hover:text-text";

  return (
    <footer className="mx-auto w-full max-w-[1200px] px-4 pb-12 sm:px-6">
      <div className="glass flex flex-col gap-6 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-base font-semibold text-text">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-muted">
            © {profile.copyrightYear} {profile.name} · Built with Next.js
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${profile.name} on GitHub`}
            className={socialLinkClass}
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${profile.name} on LinkedIn`}
            className={socialLinkClass}
          >
            <LinkedinIcon className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => scrollToTarget("#hero", lenis ?? null, 0)}
            aria-label="Back to top"
            className={socialLinkClass}
          >
            <ArrowUp className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
