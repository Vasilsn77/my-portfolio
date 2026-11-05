"use client";

import {
  useCallback,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Adds a hover glow + subtle cursor-follow highlight on desktop. */
  interactive?: boolean;
  id?: string;
};

/**
 * Reusable glass card — purple-tinted border, soft glow, large radius.
 * The cursor-follow highlight is desktop/fine-pointer only and off for
 * reduced-motion users.
 */
export function Card({
  children,
  className,
  interactive = false,
  id,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useReducedMotion();
  const showGlow = interactive && finePointer && !reducedMotion;

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
    [],
  );

  return (
    <div
      ref={ref}
      id={id}
      onPointerMove={showGlow ? onPointerMove : undefined}
      className={cn("card", interactive && "card--interactive", className)}
    >
      {showGlow ? <span className="card__glow" aria-hidden="true" /> : null}
      {children}
    </div>
  );
}
