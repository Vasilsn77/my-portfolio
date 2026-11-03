import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { GithubIcon } from "@/components/ui/BrandIcons";
import {
  getAdjacentProjects,
  getProjectBySlug,
  projects,
} from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/**
 * The whole page is derived from `params`, so there is no meaningful static
 * shell to render before the slug is known. Opt this segment out of the
 * instant-navigation validation (pages are still prerendered per slug).
 */
export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

function BulletSection({
  index,
  title,
  items,
}: {
  index: string;
  title: string;
  items: string[];
}) {
  if (items.length === 0) return null;

  return (
    <Reveal>
      <section className="mt-14">
        <p className="font-mono-label mb-3">
          <span className="text-accent-cyan">{index}</span>
          {" / "}
          {title}
        </p>
        <h2 className="font-heading text-2xl font-semibold text-text">{title}</h2>
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base"
            >
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-violet"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}

export default async function ProjectCaseStudyPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  const detailSections = [
    { title: "What I built", items: project.bullets ?? project.features ?? [] },
    { title: "Pipeline", items: project.pipeline ?? [] },
    { title: "Use cases", items: project.useCases ?? [] },
    { title: "Highlights", items: project.highlights ?? [] },
  ].filter((section) => section.items.length > 0);

  return (
    <main className="mx-auto w-full max-w-[880px] px-4 pt-28 pb-24 sm:px-6 md:pt-32 md:pb-32">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Back to projects
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted uppercase">
            {project.category}
          </span>
          {project.featured ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-2.5 py-1 text-[11px] font-medium text-accent-cyan">
              <Star className="size-3" aria-hidden />
              Featured
            </span>
          ) : null}
        </div>

        <h1 className="font-heading mt-4 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          {project.title}
        </h1>
        {project.subtitle ? (
          <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
            {project.subtitle}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text transition-colors hover:border-white/20"
            >
              <GithubIcon className="size-4" />
              View source
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          ) : null}
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text transition-colors hover:border-white/20"
          >
            Get in touch
          </Link>
        </div>
      </header>

      <Reveal>
        <section className="mt-14">
          <p className="font-mono-label mb-3">
            <span className="text-accent-cyan">01</span>
            {" / Overview"}
          </p>
          <h2 className="font-heading text-2xl font-semibold text-text">
            Overview
          </h2>
          <p className="prose-width mt-4 text-base leading-relaxed text-muted">
            {project.summary}
          </p>
          {project.contextNote ? (
            <p className="prose-width mt-3 text-sm text-muted italic">
              {project.contextNote}
            </p>
          ) : null}
        </section>
      </Reveal>

      {detailSections.map((section, index) => (
        <BulletSection
          key={section.title}
          index={String(index + 2).padStart(2, "0")}
          title={section.title}
          items={section.items}
        />
      ))}

      <Reveal>
        <section className="mt-14">
          <p className="font-mono-label mb-3">
            <span className="text-accent-cyan">Tech Stack</span>
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <nav
        className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
        aria-label="Other projects"
      >
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="glass rounded-2xl p-5 transition-colors hover:border-white/15"
          >
            <span className="font-mono-label inline-flex items-center gap-2">
              <ArrowLeft className="size-3.5" aria-hidden />
              Previous
            </span>
            <p className="font-heading mt-2 text-base text-text">
              {prev.title}
            </p>
          </Link>
        ) : null}

        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="glass rounded-2xl p-5 transition-colors hover:border-white/15 sm:col-start-2 sm:text-right"
          >
            <span className="font-mono-label inline-flex items-center gap-2">
              Next
              <ArrowRight className="size-3.5" aria-hidden />
            </span>
            <p className="font-heading mt-2 text-base text-text">
              {next.title}
            </p>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
