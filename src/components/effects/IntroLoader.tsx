"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const SESSION_KEY = "vasil-portfolio-intro-seen";
const INTRO_MS = 1100;

/**
 * Brief intro: monogram "V" draws in, then the overlay fades.
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
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="loader-grad" x1="0" y1="0" x2="72" y2="72">
                <stop stopColor="#22D3EE" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <motion.path
              d="M18 16 L36 56 L54 16"
              stroke="url(#loader-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            <title>{profile.monogram}</title>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
