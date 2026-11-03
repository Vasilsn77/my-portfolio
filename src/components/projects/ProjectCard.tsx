"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { ProjectCover } from "@/components/projects/ProjectCover";
import type { Project } from "@/data/projects";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";

/** Max tilt in either axis (degrees) — deliberately restrained. */
const MAX_TILT = 6;
const VISIBLE_TECH = 4;

type ProjectCardProps = {
  project: Project;
  className?: string;
};

/**
 * Glass project card with a soft cursor-following glow and a gentle tilt
 * (desktop + fine pointer only; disabled for reduced motion).
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const tiltEnabled = !reducedMotion && isFinePointer;

  const cardRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const node = cardRef.current;
    if (!tiltEnabled || !node) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rotateY.set((px - 0.5) * 2 * MAX_TILT);
    rotateX.set((0.5 - py) * 2 * MAX_TILT);

    glowRef.current?.style.setProperty("--glow-x", `${px * 100}%`);
    glowRef.current?.style.setProperty("--glow-y", `${py * 100}%`);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const visibleTech = project.tech.slice(0, VISIBLE_TECH);
  const extraTech = project.tech.length - visibleTech.length;
  const caseStudyHref = `/projects/${project.slug}`;

  return (
    <motion.article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        tiltEnabled
          ? {
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformPerspective: 1000,
            }
          : undefined
      }
      className={cn(
        "glass group relative flex flex-col overflow-hidden rounded-2xl transition-colors duration-300 hover:border-white/15",
        className,
      )}
    >
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(34,211,238,0.14), transparent 65%)",
        }}
      />

      <div className="relative">
        <ProjectCover slug={project.slug} image={project.image} />

        {project.featured ? (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full border border-accent-cyan/30 bg-bg/70 px-2.5 py-1 text-[11px] font-medium text-accent-cyan backdrop-blur-sm">
            <Star className="size-3" aria-hidden />
            Featured
          </span>
        ) : null}

        <span className="absolute top-3 right-3 rounded-full border border-border bg-bg/70 px-2.5 py-1 font-mono text-[10px] tracking-wider text-muted uppercase backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-lg leading-snug font-semibold text-text">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {visibleTech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted"
            >
              {tech}
            </li>
          ))}
          {extraTech > 0 ? (
            <li className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted">
              +{extraTech}
            </li>
          ) : null}
        </ul>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
          <Link
            href={caseStudyHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text transition-colors hover:text-accent-cyan after:absolute after:inset-0 after:content-['']"
          >
            Case study
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
            <span className="sr-only">: {project.title}</span>
          </Link>

          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="relative z-10 rounded-full border border-border p-2 text-muted transition-colors hover:border-white/20 hover:text-text"
            >
              <GithubIcon className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
