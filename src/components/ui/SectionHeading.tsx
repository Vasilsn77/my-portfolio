import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  title: string;
  description?: string;
  className?: string;
  headingId?: string;
};

/** Mono eyebrow + Space Grotesk title used across sections. */
export function SectionHeading({
  index,
  title,
  description,
  className,
  headingId,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 max-w-2xl", className)}>
      <p className="font-mono-label mb-3">
        <span className="text-accent-cyan">{index}</span>
        {" / "}
        {title}
      </p>
      <h2
        id={headingId}
        className="font-heading text-3xl font-semibold tracking-tight text-text sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="prose-width mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
