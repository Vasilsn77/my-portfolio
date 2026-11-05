import { cn } from "@/lib/utils";

/** The logo mark — a glass tile with a geometric "V" that reads as an AI node. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("logo-mark shrink-0", className)}
      role="img"
      aria-label="Vasil S N logo"
    >
      <defs>
        <linearGradient id="logo-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#4F6FEF" />
        </linearGradient>
        <linearGradient id="logo-right" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F6FEF" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id="logo-border" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#4F6FEF" />
        </linearGradient>
        <radialGradient id="logo-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect
        x="0.5"
        y="0.5"
        width="39"
        height="39"
        rx="11"
        fill="#151518"
        stroke="url(#logo-border)"
        strokeWidth="1"
      />
      <path
        className="logo-stroke"
        d="M11 12 L20 28"
        stroke="url(#logo-left)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="logo-stroke"
        d="M29 12 L20 28"
        stroke="url(#logo-right)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="28" r="4.5" fill="url(#logo-glow)" />
      <circle cx="20" cy="28" r="2" fill="#E9D5FF" />
    </svg>
  );
}

/** Mark + optional "Vasil." wordmark (wordmark hidden on mobile). */
export function Logo({
  withWordmark = false,
  className,
}: {
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-10" />
      {withWordmark ? (
        <span className="font-heading hidden text-lg font-semibold text-heading md:inline">
          Vasil<span className="text-accent-violet">.</span>
        </span>
      ) : null}
    </span>
  );
}
