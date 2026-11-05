import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared site-wide container so every section spans the same width. */
export const containerClass =
  "mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(containerClass, className)}>{children}</div>;
}
