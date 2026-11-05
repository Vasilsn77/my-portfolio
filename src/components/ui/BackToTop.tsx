"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

/** Floating circular "back to top" button — appears past the first screen. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = useCallback(() => {
    if (lenis) {
      lenis.scrollTo(0, { lerp: 0.1 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [lenis]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      className={cn(
        "gradient-btn fixed bottom-6 right-6 z-[70] flex size-14 items-center justify-center rounded-full",
        "shadow-[0_0_40px_-8px_rgba(168,85,247,0.75)] transition-all duration-300 hover:scale-105",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ChevronUp className="size-6" aria-hidden="true" />
    </button>
  );
}
