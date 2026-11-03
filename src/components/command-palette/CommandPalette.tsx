"use client";

import { Command } from "cmdk";
import {
  Briefcase,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Mail,
  Navigation,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { copyToClipboard } from "@/lib/utils";
import { scrollToTarget } from "@/lib/scroll";
import { useToast } from "@/components/ui/Toast";
import { useCommandPalette } from "./CommandPaletteProvider";

/**
 * Global command palette (⌘K / Ctrl+K).
 * Groups: Navigate, Projects, Actions, Social.
 *
 * `cvAvailable` is resolved on the server; the "Download CV" action is hidden
 * when `public/cv.pdf` is missing (the "Open Resume" action still works).
 */
export function CommandPalette({
  cvAvailable,
}: {
  cvAvailable: boolean;
}) {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();
  const lenis = useLenis();
  const { showToast } = useToast();

  const close = () => setOpen(false);

  const goToSection = (href: string) => {
    close();
    if (window.location.pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    scrollToTarget(href, lenis ?? null);
  };

  const runAction = async (action: string) => {
    close();
    switch (action) {
      case "resume":
        router.push("/resume");
        break;
      case "download-cv":
        window.open(profile.cvSrc, "_blank", "noopener,noreferrer");
        break;
      case "copy-email": {
        const ok = await copyToClipboard(profile.email);
        showToast(ok ? "Email copied" : "Could not copy email");
        break;
      }
      case "send-email":
        window.location.href = `mailto:${profile.email}`;
        break;
      default:
        break;
    }
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="fixed inset-0 z-[90]"
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm"
      contentClassName="glass-elevated fixed left-1/2 top-[18%] z-[91] w-[min(100%-1.5rem,560px)] -translate-x-1/2 overflow-hidden rounded-2xl shadow-glow"
    >
      <div className="border-b border-border px-4 py-3">
        <Command.Input
          placeholder="Search sections, projects, actions…"
          className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted"
        />
      </div>

      <Command.List className="max-h-[360px] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-8 text-center text-sm text-muted">
          No results found.
        </Command.Empty>

        <Command.Group
          heading="Navigate"
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono-label"
        >
          {profile.navLinks.map((link) => (
            <Command.Item
              key={link.id}
              value={`navigate ${link.label}`}
              keywords={[link.label, link.id]}
              onSelect={() => goToSection(link.href)}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-text aria-selected:bg-white/5"
            >
              <Navigation className="size-4 text-accent-cyan" aria-hidden />
              {link.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group
          heading="Projects"
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono-label"
        >
          {projects.map((project) => (
            <Command.Item
              key={project.slug}
              value={`project ${project.title}`}
              keywords={[project.title, project.category, ...project.tech]}
              onSelect={() => {
                close();
                router.push(`/projects/${project.slug}`);
              }}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-text aria-selected:bg-white/5"
            >
              <Briefcase className="size-4 text-accent-violet" aria-hidden />
              <span className="truncate">{project.title}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group
          heading="Actions"
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono-label"
        >
          <Command.Item
            value="Open Resume"
            onSelect={() => runAction("resume")}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-text aria-selected:bg-white/5"
          >
            <FileText className="size-4 text-muted" aria-hidden />
            Open Resume
          </Command.Item>
          {cvAvailable ? (
            <Command.Item
              value="Download CV"
              onSelect={() => runAction("download-cv")}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-text aria-selected:bg-white/5"
            >
              <Download className="size-4 text-muted" aria-hidden />
              Download CV
            </Command.Item>
          ) : null}
          <Command.Item
            value="Copy Email"
            onSelect={() => runAction("copy-email")}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-text aria-selected:bg-white/5"
          >
            <Copy className="size-4 text-muted" aria-hidden />
            Copy Email
          </Command.Item>
          <Command.Item
            value="Send Email"
            onSelect={() => runAction("send-email")}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-text aria-selected:bg-white/5"
          >
            <Mail className="size-4 text-muted" aria-hidden />
            Send Email
          </Command.Item>
        </Command.Group>

        <Command.Group
          heading="Social"
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono-label"
        >
          <Command.Item
            value="GitHub"
            onSelect={() => {
              close();
              window.open(profile.github, "_blank", "noopener,noreferrer");
            }}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-text aria-selected:bg-white/5"
          >
            <GithubIcon className="size-4 text-muted" />
            GitHub
            <ExternalLink className="ml-auto size-3.5 text-muted" aria-hidden />
          </Command.Item>
          <Command.Item
            value="LinkedIn"
            onSelect={() => {
              close();
              window.open(profile.linkedin, "_blank", "noopener,noreferrer");
            }}
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-text aria-selected:bg-white/5"
          >
            <LinkedinIcon className="size-4 text-muted" />
            LinkedIn
            <ExternalLink className="ml-auto size-3.5 text-muted" aria-hidden />
          </Command.Item>
        </Command.Group>
      </Command.List>

      <div className="flex items-center gap-3 border-t border-border px-4 py-2.5 text-[11px] text-muted">
        <span>
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">
            ↑↓
          </kbd>{" "}
          navigate
        </span>
        <span>
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">
            ↵
          </kbd>{" "}
          open
        </span>
        <span>
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono">
            esc
          </kbd>{" "}
          close
        </span>
      </div>
    </Command.Dialog>
  );
}
