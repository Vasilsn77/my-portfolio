import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type MonogramOrbProps = {
  className?: string;
  label?: string;
};

/**
 * Gradient orb + monogram placeholder used when /images/me.jpg is missing.
 */
export function MonogramOrb({
  className,
  label = `${profile.name} portrait placeholder`,
}: MonogramOrbProps) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-md overflow-hidden rounded-[2rem]",
        className,
      )}
      role="img"
      aria-label={label}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(168,85,247,0.45), transparent 45%), radial-gradient(circle at 70% 70%, rgba(79,111,239,0.4), transparent 50%), #151518",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%)]" />
      <div className="absolute inset-6 rounded-[1.5rem] border border-white/10" />
      <div className="relative flex h-full items-center justify-center">
        <span className="font-heading text-7xl font-bold text-gradient sm:text-8xl">
          {profile.monogram}
        </span>
      </div>
    </div>
  );
}
