import Image from "next/image";
import type { ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Deterministic FNV-1a hash → a stable 32-bit seed per slug.
 * The same slug always renders the same cover on server and client.
 */
function hashSlug(slug: string): number {
  let hash = 2166136261;
  for (let i = 0; i < slug.length; i += 1) {
    hash ^= slug.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

const PATTERNS = ["grid", "dots", "diagonal"] as const;

/** Base hue pair per category — keeps covers on-brand at a glance. */
const CATEGORY_HUES: Record<ProjectCategory, { a: number; b: number }> = {
  "AI & ML": { a: 262, b: 286 },
  "Full Stack & Apps": { a: 182, b: 212 },
  "Systems & Security": { a: 150, b: 174 },
};

type ProjectCoverProps = {
  slug: string;
  /** Real screenshot when available; falls back to generated art. */
  image?: string;
  /** Tints the generated art by category. */
  category?: ProjectCategory;
  className?: string;
};

/**
 * Abstract cover art derived from the project slug and category — always
 * on-brand, decorative only (the card/heading carries the project name).
 * Renders the optional `image` when provided.
 */
export function ProjectCover({
  slug,
  image,
  category,
  className,
}: ProjectCoverProps) {
  if (image) {
    return (
      <div
        className={cn("relative aspect-[16/10] w-full overflow-hidden", className)}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const hash = hashSlug(slug);
  const base = CATEGORY_HUES[category ?? "AI & ML"];
  const hueA = base.a + (hash % 16);
  const hueB = base.b + ((hash >>> 7) % 16);
  const angle = 105 + ((hash >>> 13) % 70);
  const glowX = 18 + ((hash >>> 3) % 64);
  const glowY = 14 + ((hash >>> 11) % 56);
  const pattern = PATTERNS[(hash >>> 19) % PATTERNS.length];

  const patternImage =
    pattern === "grid"
      ? "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)"
      : pattern === "dots"
        ? "radial-gradient(rgba(255,255,255,0.16) 1px, transparent 1px)"
        : "repeating-linear-gradient(135deg, rgba(255,255,255,0.10) 0 1px, transparent 1px 9px)";

  const patternSize =
    pattern === "grid"
      ? "26px 26px, 26px 26px"
      : pattern === "dots"
        ? "18px 18px"
        : "auto";

  return (
    <div
      className={cn("relative aspect-[16/10] w-full overflow-hidden", className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            `radial-gradient(85% 85% at ${glowX}% ${glowY}%, hsla(${hueA}, 92%, 60%, 0.55), transparent 62%)`,
            `radial-gradient(75% 75% at ${100 - glowX}% ${100 - glowY}%, hsla(${hueB}, 88%, 62%, 0.48), transparent 60%)`,
            `linear-gradient(${angle}deg, hsl(${hueA} 62% 12%), hsl(${hueB} 58% 10%))`,
          ].join(", "),
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{ backgroundImage: patternImage, backgroundSize: patternSize }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_120%,rgba(11,11,14,0.85),transparent_60%)]" />
    </div>
  );
}
