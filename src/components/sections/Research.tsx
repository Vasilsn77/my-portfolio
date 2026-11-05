"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown, FileText } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { Card } from "@/components/ui/Card";
import { containerClass } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { papers } from "@/data/research";
import { cn } from "@/lib/utils";

/**
 * Research: the published paper, authors, venue, dataset/methods (expandable)
 * and a link to its case study.
 */
export function Research() {
  return (
    <section
      id="research"
      className={cn(containerClass, "py-24 md:py-32")}
      aria-labelledby="research-heading"
    >
      <SectionHeading
        id="research-heading"
        title="Research"
        highlight="Research"
        subtitle="Work on applying large language models to real software-engineering problems."
      />

      <div className="mt-12 space-y-6">
        {papers.map((paper) => (
          <Reveal key={paper.id}>
            <Card interactive className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl border border-accent-violet/35 bg-accent-violet/10">
                  <FileText className="size-5 text-accent-violet" aria-hidden />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-violet/30 bg-accent-violet/10 px-2.5 py-1 text-[11px] font-medium text-accent-violet">
                  {paper.field}
                </span>
                {paper.status ? (
                  <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted uppercase">
                    {paper.status}
                  </span>
                ) : null}
              </div>

              <h3 className="font-heading mt-4 text-xl leading-snug font-semibold text-heading sm:text-2xl">
                {paper.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {paper.subtitle}
              </p>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="font-mono-label mb-1">Authors</dt>
                  <dd className="text-sm leading-relaxed text-muted">
                    {paper.authors.map((author, index) => (
                      <span key={author}>
                        {index > 0 ? ", " : null}
                        <span
                          className={
                            author === paper.highlightAuthor
                              ? "font-medium text-accent-violet"
                              : undefined
                          }
                        >
                          {author}
                        </span>
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono-label mb-1">Year</dt>
                  <dd className="text-sm leading-relaxed text-muted">
                    {paper.year}
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-mono-label mb-1">Venue</dt>
                  <dd className="text-sm leading-relaxed text-muted">
                    {paper.venue}
                  </dd>
                </div>
              </dl>

              <p className="prose-width mt-6 text-sm leading-relaxed text-muted sm:text-base">
                {paper.summary}
              </p>

              <details className="group mt-6 border-t border-border pt-5">
                <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-heading transition-colors hover:text-accent-violet [&::-webkit-details-marker]:hidden">
                  <ChevronDown
                    className="size-4 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                  Dataset &amp; methods
                </summary>
                <dl className="mt-4 grid gap-4">
                  <div>
                    <dt className="font-mono-label mb-1">Dataset</dt>
                    <dd className="prose-width text-sm leading-relaxed text-muted">
                      {paper.dataset}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono-label mb-1">Methods</dt>
                    <dd className="prose-width text-sm leading-relaxed text-muted">
                      {paper.methods}
                    </dd>
                  </div>
                </dl>
              </details>

              <div className="mt-6 flex flex-wrap items-center gap-5">
                <Link
                  href={`/projects/${paper.caseStudySlug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-heading transition-colors hover:text-accent-violet"
                >
                  Read the case study
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
                {paper.paperUrl ? (
                  <a
                    href={paper.paperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-heading"
                  >
                    Paper
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                ) : null}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
