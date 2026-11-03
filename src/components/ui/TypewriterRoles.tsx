"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

type TypewriterRolesProps = {
  roles: readonly string[];
  className?: string;
};

/**
 * Cycles through role strings with a typewriter + delete effect.
 */
export function TypewriterRoles({ roles, className }: TypewriterRolesProps) {
  const reducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion || roles.length === 0) return;

    const current = roles[roleIndex] ?? "";
    const typingSpeed = deleting ? 28 : 55;
    const pauseAtEnd = 1600;

    if (!deleting && text === current) {
      const pause = window.setTimeout(() => setDeleting(true), pauseAtEnd);
      return () => window.clearTimeout(pause);
    }

    if (deleting && text === "") {
      const pause = window.setTimeout(() => {
        setDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 380);
      return () => window.clearTimeout(pause);
    }

    const timer = window.setTimeout(() => {
      const next = deleting
        ? current.slice(0, Math.max(0, text.length - 1))
        : current.slice(0, text.length + 1);
      setText(next);
    }, typingSpeed);

    return () => window.clearTimeout(timer);
  }, [text, deleting, roleIndex, roles, reducedMotion]);

  return (
    <span className={className}>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">
        {reducedMotion ? (roles[0] ?? "") : text}
        <span
          className="ml-0.5 inline-block w-[2px] translate-y-[2px] bg-accent-cyan"
          style={{ height: "1em" }}
        />
      </span>
    </span>
  );
}
