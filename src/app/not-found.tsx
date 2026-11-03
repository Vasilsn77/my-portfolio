import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Terminal-style 404. */
export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col justify-center px-4 py-28 sm:px-6">
      <div className="glass-elevated overflow-hidden rounded-2xl">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-3 rounded-full bg-white/10" aria-hidden />
          <span className="size-3 rounded-full bg-white/10" aria-hidden />
          <span className="size-3 rounded-full bg-white/10" aria-hidden />
          <span className="ml-2 font-mono text-xs text-muted">
            bash — 404
          </span>
        </div>

        <div className="p-6 font-mono text-sm leading-relaxed">
          <p className="text-muted">
            <span className="text-accent-cyan">vasil@portfolio</span>
            {":~$ curl -I "}
            <span className="text-text">/this-route</span>
          </p>
          <p className="mt-3 text-muted">HTTP/1.1 404 Not Found</p>
          <p className="mt-1 text-text">
            Error: no such page. It was moved, renamed, or never existed.
          </p>
          <p className="mt-5 text-muted">
            <span className="text-accent-cyan">vasil@portfolio</span>
            {":~$ "}
            <span className="animate-pulse">▋</span>
          </p>
        </div>
      </div>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 self-start text-sm text-text transition-colors hover:text-accent-cyan"
      >
        <ArrowLeft className="size-4" aria-hidden />
        cd ~ (back home)
      </Link>
    </main>
  );
}
