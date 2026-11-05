"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "motion/react";
import {
  Briefcase,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Mail,
  Navigation,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { copyToClipboard } from "@/lib/utils";
import { scrollToTarget } from "@/lib/scroll";
import { useToast } from "@/components/ui/Toast";
import { useCommandPalette } from "./CommandPaletteProvider";

const itemClass =
  "relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text " +
  "before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:rounded-full " +
  "before:bg-accent-violet before:opacity-0 " +
  "data-[selected=true]:bg-[rgba(168,85,247,0.14)] data-[selected=true]:before:opacity-100";

const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 " +
  "[&_[cmdk-group-heading]]:font-mono-label";

/**
 * Global command palette (⌘K / Ctrl+K).
 * Rendered in a portal above everything with a controlled open state.
 * Groups: Navigate, Projects, Actions, Social.
 */
export function CommandPalette({ cvAvailable }: { cvAvailable: boolean }) {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();
  const lenis = useLenis();
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  // SSR-safe portal guard: false on the server, true once hydrated.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const close = () => setOpen(false);

  // Lock page scroll (Lenis + native) while the palette is open.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [open, lenis]);

  // Escape closes.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

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
      case "download-cv": {
        const link = document.createElement("a");
        link.href = "/resume/download";
        link.download = "Vasil_S_N_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        break;
      }
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

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="palette"
          className="fixed inset-0 z-[120] flex items-start justify-center p-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-[min(100%-1.5rem,640px)] overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-[0_0_60px_-12px_rgba(168,85,247,0.6)]"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <Command label="Command palette" loop className="flex flex-col">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <Command.Input
                  ref={inputRef}
                  autoFocus
                  placeholder="Search sections, projects, actions…"
                  className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted"
                />
              </div>

              <Command.List className="max-h-[380px] overflow-y-auto p-2">
                <Command.Empty className="px-3 py-10 text-center text-sm text-muted">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigate" className={groupClass}>
                  {profile.navLinks.map((link) => (
                    <Command.Item
                      key={link.id}
                      value={`navigate ${link.label}`}
                      keywords={[link.label, link.id]}
                      onSelect={() => goToSection(link.href)}
                      className={itemClass}
                    >
                      <Navigation
                        className="size-4 text-accent-violet"
                        aria-hidden="true"
                      />
                      {link.label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Projects" className={groupClass}>
                  {projects.map((project) => (
                    <Command.Item
                      key={project.slug}
                      value={`project ${project.title}`}
                      keywords={[
                        project.title,
                        project.category,
                        ...project.tech,
                      ]}
                      onSelect={() => {
                        close();
                        router.push(`/projects/${project.slug}`);
                      }}
                      className={itemClass}
                    >
                      <Briefcase
                        className="size-4 text-accent-violet"
                        aria-hidden="true"
                      />
                      <span className="truncate">{project.title}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Actions" className={groupClass}>
                  <Command.Item
                    value="Open Resume"
                    onSelect={() => runAction("resume")}
                    className={itemClass}
                  >
                    <FileText
                      className="size-4 text-accent-indigo"
                      aria-hidden="true"
                    />
                    Open Resume
                  </Command.Item>
                  {cvAvailable ? (
                    <Command.Item
                      value="Download Resume"
                      keywords={["cv", "download"]}
                      onSelect={() => runAction("download-cv")}
                      className={itemClass}
                    >
                      <Download
                        className="size-4 text-accent-indigo"
                        aria-hidden="true"
                      />
                      Download Resume
                    </Command.Item>
                  ) : null}
                  <Command.Item
                    value="Copy Email"
                    onSelect={() => runAction("copy-email")}
                    className={itemClass}
                  >
                    <Copy
                      className="size-4 text-accent-pink"
                      aria-hidden="true"
                    />
                    Copy Email
                  </Command.Item>
                  <Command.Item
                    value="Send Email"
                    onSelect={() => runAction("send-email")}
                    className={itemClass}
                  >
                    <Mail
                      className="size-4 text-accent-pink"
                      aria-hidden="true"
                    />
                    Send Email
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Social" className={groupClass}>
                  <Command.Item
                    value="GitHub"
                    onSelect={() => {
                      close();
                      window.open(
                        profile.github,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                    className={itemClass}
                  >
                    <GithubIcon className="size-4 text-text" />
                    GitHub
                    <ExternalLink
                      className="ml-auto size-3.5 text-muted"
                      aria-hidden="true"
                    />
                  </Command.Item>
                  <Command.Item
                    value="LinkedIn"
                    onSelect={() => {
                      close();
                      window.open(
                        profile.linkedin,
                        "_blank",
                        "noopener,noreferrer",
                      );
                    }}
                    className={itemClass}
                  >
                    <LinkedinIcon className="size-4 text-[#0A66C2]" />
                    LinkedIn
                    <ExternalLink
                      className="ml-auto size-3.5 text-muted"
                      aria-hidden="true"
                    />
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
            </Command>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
