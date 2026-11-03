"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]";

type TextScrambleProps = {
  text: string;
  className?: string;
  /** Total scramble duration in ms */
  durationMs?: number;
};

/**
 * One-shot decode/scramble effect for the hero name.
 * Skips animation when reduced motion is preferred.
 */
export function TextScramble({
  text,
  className,
  durationMs = 900,
}: TextScrambleProps) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (reducedMotion) return;

    let frame = 0;
    const totalFrames = Math.max(12, Math.floor(durationMs / 32));
    let timer = 0;

    const tick = () => {
      frame += 1;
      const progress = frame / totalFrames;
      const revealCount = Math.floor(progress * text.length);

      const next = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < revealCount) return text[index];
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplay(next);

      if (frame < totalFrames) {
        timer = window.setTimeout(tick, 32);
      } else {
        setDisplay(text);
      }
    };

    tick();
    return () => window.clearTimeout(timer);
  }, [text, durationMs, reducedMotion]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{reducedMotion ? text : display}</span>
    </span>
  );
}
