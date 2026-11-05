"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

/**
 * Fixed background atmosphere: grid, top glow, film grain,
 * and a desktop-only cursor spotlight (rAF-throttled).
 */
export function Atmosphere() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const enabled = !reducedMotion && isFinePointer;

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el || !enabled) {
      el?.classList.remove("is-active");
      return;
    }

    let raf = 0;
    let pendingX = 0;
    let pendingY = 0;
    let hasPending = false;

    const flush = () => {
      raf = 0;
      if (!hasPending) return;
      hasPending = false;
      el.style.setProperty("--spotlight-x", `${pendingX}px`);
      el.style.setProperty("--spotlight-y", `${pendingY}px`);
      el.classList.add("is-active");
    };

    const onMove = (event: PointerEvent) => {
      pendingX = event.clientX;
      pendingY = event.clientY;
      hasPending = true;
      if (!raf) raf = window.requestAnimationFrame(flush);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
      el.classList.remove("is-active");
    };
  }, [enabled]);

  return (
    <div className="site-atmosphere" aria-hidden="true">
      <div className="site-atmosphere__blob site-atmosphere__blob--violet" />
      <div className="site-atmosphere__blob site-atmosphere__blob--indigo" />
      <div className="site-atmosphere__glow" />
      <div className="site-atmosphere__grid" />
      <div ref={spotlightRef} className="site-atmosphere__spotlight" />
      <div className="site-atmosphere__noise" />
    </div>
  );
}
