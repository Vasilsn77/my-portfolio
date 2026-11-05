import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  /** Substring of `title` to render with the gradient treatment. */
  highlight?: string;
  subtitle?: ReactNode;
  eyebrow?: string;
  icon?: ReactNode;
  id?: string;
  align?: "center" | "left";
  className?: string;
};

/**
 * Centered (or left-aligned) section heading: optional mono eyebrow,
 * a large Space Grotesk title with one gradient word, and a subtitle.
 */
export function SectionHeading({
  title,
  highlight,
  subtitle,
  eyebrow,
  icon,
  id,
  align = "center",
  className,
}: SectionHeadingProps) {
  const at = highlight ? title.indexOf(highlight) : -1;
  const hasHighlight = highlight !== undefined && at !== -1;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="font-mono-label inline-flex items-center gap-2">
          {icon ? <span aria-hidden="true">{icon}</span> : null}
          {eyebrow}
        </span>
      ) : null}

      <h2
        id={id}
        className="font-heading text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-[3.25rem]"
      >
        {hasHighlight && highlight ? (
          <>
            {title.slice(0, at)}
            <span className="text-gradient">{highlight}</span>
            {title.slice(at + highlight.length)}
          </>
        ) : (
          title
        )}
      </h2>

      {subtitle ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
