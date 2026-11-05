"use client";

import { FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { containerClass } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const socialLinkClass =
  "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-border-hover hover:text-heading";

/**
 * Site footer: centered social links, copyright line.
 * (Back-to-top lives globally in <BackToTop />, not here.)
 */
export function Footer() {
  return (
    <footer className={cn(containerClass, "pb-12")}>
      <div className="hairline" aria-hidden="true" />
      <div className="flex flex-col items-center gap-6 pt-10 text-center">
        <Logo withWordmark />

        <nav aria-label="Social links" className="flex flex-wrap justify-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClass}
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={socialLinkClass}
          >
            <LinkedinIcon className="size-4" />
            LinkedIn
          </a>
          <a href="/resume" className={socialLinkClass}>
            <FileText className="size-4" aria-hidden />
            Resume
          </a>
        </nav>

        <p className="text-sm text-muted">
          © {profile.copyrightYear} {profile.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
