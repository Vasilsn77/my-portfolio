"use client";

import type Lenis from "lenis";

/**
 * Smooth-scroll to a CSS selector or element using Lenis when available,
 * falling back to native scrollIntoView.
 */
export function scrollToTarget(
  target: string | HTMLElement,
  lenis?: Lenis | null,
  offset = -80,
): void {
  if (lenis) {
    lenis.scrollTo(target, { offset, lerp: 0.1 });
    return;
  }

  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (el instanceof HTMLElement) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
