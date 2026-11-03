"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  durationMs?: number;
};

/** Counts up from 0 when the element first enters the viewport. */
export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  className,
  durationMs = 1200,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(() => (0).toFixed(decimals));

  useEffect(() => {
    if (!inView || reducedMotion) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay((value * eased).toFixed(decimals));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, decimals, durationMs, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {reducedMotion ? value.toFixed(decimals) : display}
      {suffix}
    </span>
  );
}
