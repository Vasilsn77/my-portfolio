"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

const SESSION_KEY = "vasil-portfolio-intro-seen";
const INTRO_MS = 1100;

/**
 * Brief intro: the logo mark scales in, then the overlay fades.
 * Skipped on repeat visits in the same session and for reduced motion.
 *
 * The overlay always renders on the server and first paint (so there is never
 * a flash of page content); the effect below removes it either immediately
 * (already seen / reduced motion) or after the draw finishes.
 */
export function IntroLoader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage may be blocked — still play the intro once
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const shouldPlay = !prefersReduced && !seen;

    if (shouldPlay) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
    }

    const timer = window.setTimeout(
      () => setHidden(true),
      shouldPlay ? INTRO_MS : 0,
    );
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {hidden ? null : (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0.4, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <LogoMark className="size-20" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
