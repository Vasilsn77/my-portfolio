"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { useLenis } from "lenis/react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/lib/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { scrollToTarget } from "@/lib/scroll";
import { useCommandPalette } from "@/components/command-palette/CommandPaletteProvider";

const noopSubscribe = () => () => {};
const detectModKey = () =>
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad/.test(navigator.platform)
    ? "⌘"
    : "Ctrl";

/**
 * Sticky glass navbar with active-section highlight,
 * Resume button, ⌘K chip, and mobile full-screen menu.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lenis = useLenis();
  const router = useRouter();
  const { toggle: togglePalette } = useCommandPalette();

  const sectionIds = useMemo(
    () => profile.navLinks.map((link) => link.id),
    [],
  );
  const activeId = useActiveSection(sectionIds);

  // Read the platform label from outside React (stable, no cascading render).
  const modKey = useSyncExternalStore(noopSubscribe, detectModKey, () => "Ctrl");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      if (window.location.pathname !== "/") {
        router.push(`/${href}`);
        return;
      }
      scrollToTarget(href, lenis ?? null);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[padding,background,backdrop-filter] duration-300",
          scrolled ? "py-2" : "py-4",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6",
            "rounded-2xl border transition-colors duration-300",
            scrolled
              ? "glass border-border"
              : "border-transparent bg-transparent",
          )}
        >
          <Link
            href="/#hero"
            onClick={(event) => {
              if (window.location.pathname === "/") {
                event.preventDefault();
                scrollToTarget("#hero", lenis ?? null, 0);
              }
            }}
            className="font-heading flex size-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#22D3EE33,#8B5CF633)] text-lg font-bold text-text"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="text-gradient">{profile.monogram}</span>
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {profile.navLinks.map((link) => {
              const active = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-white/5 text-text"
                      : "text-muted hover:text-text",
                  )}
                  aria-current={active ? "true" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/resume"
              className="hidden rounded-full border border-border px-3 py-1.5 text-sm text-text transition-colors hover:bg-white/5 sm:inline-flex"
            >
              Resume
            </Link>

            <button
              type="button"
              onClick={togglePalette}
              className="hidden items-center gap-1.5 rounded-full border border-border px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-white/5 hover:text-text sm:inline-flex"
              aria-label="Open command palette"
            >
              <kbd className="font-mono">{modKey} K</kbd>
            </button>

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-border text-text md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-bg/95 px-6 pb-10 pt-24 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {profile.navLinks.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-heading border-b border-border py-4 text-2xl text-text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/resume"
                onClick={() => setMobileOpen(false)}
                className="rounded-full border border-border px-4 py-3 text-center text-sm text-text"
              >
                Resume
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  togglePalette();
                }}
                className="rounded-full bg-white/5 px-4 py-3 text-sm text-muted"
              >
                Open command palette ({modKey}+K)
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
