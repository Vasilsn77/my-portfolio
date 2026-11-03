"use client";

import { motion, useReducedMotion as useMotionReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before this item animates */
  delay?: number;
  /** Extra Y travel in px (default 20) */
  y?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll-triggered fade + translateY + slight blur → sharp.
 * Animates once when it enters the viewport.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  as = "div",
}: RevealProps) {
  const reducedMotion = useMotionReducedMotion();
  const MotionTag = motion[as];

  if (reducedMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
