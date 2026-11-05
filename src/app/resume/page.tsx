import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import { containerClass } from "@/components/ui/Container";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { hasCvFile } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name} — full stack, Gen AI and ML.`,
  alternates: { canonical: "/resume" },
};

const toolbarButtonClass =
  "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text transition-colors hover:border-white/20 hover:bg-white/5";

/**
 * Resume viewer. `public/cv.pdf` is checked on the server so the page can show
 * a friendly "coming soon" state instead of a broken embed.
 */
export default function ResumePage() {
  const cvAvailable = hasCvFile();

  return (
    <main
      id="main-content"
      className={cn(containerClass, "flex flex-1 flex-col pt-24 pb-16 md:pt-28")}
    >
      <h1 className="sr-only">Resume — {profile.name}</h1>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to site
        </Link>

        {cvAvailable ? (
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/resume/download"
              download="Vasil_S_N_Resume.pdf"
              className={toolbarButtonClass}
            >
              <Download className="size-4" aria-hidden />
              Download
            </a>
            <a
              href={profile.cvSrc}
              target="_blank"
              rel="noopener noreferrer"
              className={toolbarButtonClass}
            >
              <ExternalLink className="size-4" aria-hidden />
              Open in new tab
            </a>
          </div>
        ) : null}
      </div>

      {cvAvailable ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
          <iframe
            src={profile.cvSrc}
            title={`${profile.name} — resume (PDF)`}
            className="h-[calc(100svh-13rem)] min-h-[520px] w-full"
          />
        </div>
      ) : (
        <div className="mt-6 flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-6 py-20 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-border bg-white/[0.03]">
            <FileText className="size-6 text-muted" aria-hidden />
          </span>
          <h2 className="font-heading mt-6 text-2xl font-semibold text-text">
            Resume coming soon
          </h2>
          <p className="prose-width mt-3 text-sm leading-relaxed text-muted">
            The PDF isn&apos;t available yet. In the meantime, the projects and
            experience on the home page tell the same story — or reach out and
            I&apos;ll send it over.
          </p>
          <Link
            href="/#contact"
            className="gradient-btn mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
          >
            Get in touch
          </Link>
        </div>
      )}
    </main>
  );
}
