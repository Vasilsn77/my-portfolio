"use client";

import type { ReactNode } from "react";
import { Atmosphere } from "@/components/effects/Atmosphere";
import { IntroLoader } from "@/components/effects/IntroLoader";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { CommandPaletteProvider } from "@/components/command-palette/CommandPaletteProvider";
import { Navbar } from "@/components/layout/Navbar";
import { ToastProvider } from "@/components/ui/Toast";

/** Client-side shell: scroll, nav, palette, toasts, atmosphere. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CommandPaletteProvider>
        <SmoothScroll>
          <IntroLoader />
          <Atmosphere />
          <ScrollProgress />
          <Navbar />
          <CommandPalette />
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            {children}
          </div>
        </SmoothScroll>
      </CommandPaletteProvider>
    </ToastProvider>
  );
}
