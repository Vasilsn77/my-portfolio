"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: (
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  type?: "button" | "submit";
  download?: boolean | string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

/**
 * Primary CTA with a subtle magnetic pull toward the cursor (desktop only).
 */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  type = "button",
  download,
  target,
  rel,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion();
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const enabled = !reducedMotion && isFinePointer;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    x.set(offsetX * 0.28);
    y.set(offsetY * 0.28);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const sharedClass = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium",
    "bg-[linear-gradient(135deg,#22D3EE,#8B5CF6)] text-[#05060A]",
    "shadow-[0_0_28px_rgba(34,211,238,0.22)] transition-shadow hover:shadow-[0_0_36px_rgba(139,92,246,0.28)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan",
    className,
  );

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        download={download}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={sharedClass}
        style={{ x: springX, y: springY }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={sharedClass}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.button>
  );
}
