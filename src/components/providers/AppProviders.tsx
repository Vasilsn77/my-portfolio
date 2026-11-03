"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { Atmosphere } from "@/components/effects/Atmosphere";
import { IntroLoader } from "@/components/effects/IntroLoader";
import { PageTransition } from "@/components/effects/PageTransition";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { CommandPaletteProvider } from "@/components/command-palette/CommandPaletteProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ToastProvider } from "@/components/ui/Toast";

/** Client-side shell: scroll, nav, palette, toasts, atmosphere. */
export function AppProviders({
  children,
  cvAvailable,
}: {
  children: ReactNode;
  /** Whether `public/cv.pdf` exists — resolved on the server. */
  cvAvailable: boolean;
}) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <CommandPaletteProvider>
          <SmoothScroll>
            <IntroLoader />
            <Atmosphere />
            <ScrollProgress />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:rounded-full focus:border focus:border-border focus:bg-surface-elevated focus:px-4 focus:py-2 focus:text-sm focus:text-text"
            >
              Skip to content
            </a>
            <Navbar />
            <CommandPalette cvAvailable={cvAvailable} />
            <div className="relative z-10 flex min-h-full flex-1 flex-col">
              <PageTransition>{children}</PageTransition>
            </div>
          </SmoothScroll>
        </CommandPaletteProvider>
      </ToastProvider>
    </MotionConfig>
  );
}
