"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Root Lenis provider. Anchor links and programmatic scrolls use Lenis.
 * When reduced motion is preferred, Lenis still mounts but smoothing is off
 * via respectReducedMotion + immediate scroll.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: reducedMotion ? 1 : 0.1,
        smoothWheel: !reducedMotion,
        anchors: {
          offset: -80,
          lerp: reducedMotion ? 1 : 0.1,
        },
        autoRaf: true,
        respectReducedMotion: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
