"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Card } from "@/components/ui/Card";
import { containerClass } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import {
  projectCategories,
  projects,
  type ProjectCategory,
} from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

/**
 * Projects grid with animated category filters and Motion layout re-flow.
 */
export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const prefersReducedMotion = useReducedMotion();

  const visibleProjects = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  const itemTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id="projects"
      className={cn(containerClass, "py-24 md:py-32")}
      aria-labelledby="projects-heading"
    >
      <SectionHeading
        id="projects-heading"
        title="Projects"
        highlight="Projects"
        subtitle="Selected work across AI & ML, full-stack apps, and systems & security. Each one opens as a full case study."
      />

      <div
        role="group"
        aria-label="Filter projects by category"
        className="mt-10 mb-8 flex flex-wrap justify-center gap-2"
      >
        {projectCategories.map((category) => {
          const isActive = category === filter;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(category)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm transition-colors",
                isActive ? "text-heading" : "text-muted hover:text-heading",
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="project-filter-pill"
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-accent-violet/40 bg-accent-violet/10"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 30 }
                  }
                />
              ) : null}
              <span className="relative">{category}</span>
            </button>
          );
        })}
      </div>

      <motion.ul
        layout
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              transition={itemTransition}
              className="list-none"
            >
              <ProjectCard project={project} className="h-full" />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Reveal delay={0.05}>
        <Card interactive className="mt-6 p-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
          >
            <div>
              <p className="font-heading text-lg text-heading">
                More projects in progress, check back soon
              </p>
              <p className="mt-1 text-sm text-muted">
                Everything else lives on my GitHub.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-violet">
              <GithubIcon className="size-4" />
              Visit GitHub
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </span>
          </a>
        </Card>
      </Reveal>
    </section>
  );
}
