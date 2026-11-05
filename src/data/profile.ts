/**
 * Profile & site-wide identity.
 * Edit this file to update hero copy, contact links, and availability.
 */

import { projects } from "@/data/projects";

/** TODO (confirm): PUC state rank — stored as 12. Confirm 12 vs 13. */
const PUC_STATE_RANK = 12;

export type NavLink = {
  id: string;
  label: string;
  href: string;
};

export type EducationItem = {
  school: string;
  detail: string;
  years: string;
  result?: string;
  /** Accent color for the icon tile + grade chip. */
  accent: "violet" | "indigo" | "cyan";
  /** Lucide icon key rendered in the tile. */
  icon: "GraduationCap" | "BookOpen" | "School";
};

export type StatTile =
  | {
      kind: "number";
      value: number;
      decimals?: number;
      suffix?: string;
      label: string;
    }
  | {
      kind: "text";
      value: string;
      label: string;
    };

export type RightNowCard = {
  heading: string;
  intro: string;
  bullets: string[];
};

export const profile = {
  name: "Vasil S N",
  shortName: "Vasil",
  monogram: "V",
  headline: "CSE Graduate | Full Stack + Gen AI + ML",
  statusLine: "Incoming @ LTM  ·  CSE @ PES University",
  location: "Bengaluru, India",
  relocationNote: "Open to relocation and remote; prefers Bengaluru.",
  seeking: "AI / AI-agent roles and Software Development roles.",
  email: "sayedvasil@gmail.com",
  github: "https://github.com/Vasilsn77",
  linkedin: "https://www.linkedin.com/in/vasil-s-n-878b56253",
  photoSrc: "/images/me.jpg",
  cvSrc: "/cv.pdf",
  availabilityPill: "Open to AI & Software roles · Bengaluru",
  heroRoles: [
    "Full Stack Developer",
    "GenAI & AI Agents",
    "ML Engineer",
  ] as const,
  heroCtas: [
    { label: "Contact Me", href: "#contact", variant: "primary" as const },
    { label: "Download CV", href: "/cv.pdf", variant: "secondary" as const },
  ],
  /** Content for the hero "code window" card (decorative, on-brand). */
  codeCard: {
    filename: "vasil.ts",
    varName: "vasil",
    entries: [
      { key: "role", type: "string" as const, value: "Full Stack + GenAI" },
      {
        key: "focus",
        type: "array" as const,
        value: ["AI Agents", "LLM Apps", "Web"],
      },
      { key: "location", type: "string" as const, value: "Bengaluru" },
      { key: "openToWork", type: "boolean" as const, value: true },
    ],
  },
  aboutBio: [
    "Hi, I'm Vasil, a Computer Science graduate from PES University, Bengaluru, and I'll be joining LTM as a software engineer. I like building at the intersection of full-stack development and generative AI, and I'm especially drawn to AI agents: systems that don't just answer questions, but plan and take action.",
    "My work so far spans an LLM-based framework for automated unit test generation (research paper), a real-time social media analytics platform built during my research internship at C3I, and full-stack apps with Flask and MySQL. I learn best by building, so I'm using the time before I join to revisit fundamentals, pick up new tools, and ship projects.",
    "I'm open to AI / agent and software development roles, with a preference for Bengaluru and flexibility for remote or relocation. If you're building something interesting, I'd love to talk.",
  ],
  funFact: "Off the keyboard: I like tinkering with scripts that automate boring things.",
  rightNow: {
    heading: "Right now",
    intro: "Upskilling before joining LTM",
    bullets: [
      "Revisiting core CS & DSA fundamentals",
      "Exploring AI agents & LLM application frameworks",
      "Building and polishing projects",
      "Deepening full-stack skills (Next.js, Node, databases)",
    ],
  } satisfies RightNowCard,
  /** TODO (confirm): PUC state rank — stored as 12. Confirm 12 vs 13. */
  pucStateRank: PUC_STATE_RANK,
  stats: [
    {
      kind: "number",
      value: 7.81,
      decimals: 2,
      label: "CGPA",
    },
    {
      kind: "number",
      value: 97.4,
      decimals: 1,
      suffix: "%",
      label: "PUC Score",
    },
    {
      kind: "text",
      value: `${PUC_STATE_RANK}th`,
      label: "State Rank, PUC",
    },
    {
      kind: "number",
      value: projects.length,
      decimals: 0,
      label: "Projects Built",
    },
    {
      kind: "number",
      value: 1,
      decimals: 0,
      label: "Research Paper",
    },
    {
      kind: "number",
      value: 94.6,
      decimals: 1,
      suffix: "%",
      label: "ICSE",
    },
  ] satisfies StatTile[],
  education: [
    {
      school: "PES University",
      detail: "B.Tech in Computer Science & Engineering",
      years: "2022–2026",
      result: "CGPA 7.81",
      accent: "violet",
      icon: "GraduationCap",
    },
    {
      school: "Presidency PU College",
      detail: "Pre-University, PCMB",
      years: "2020–2022",
      result: "97.4% · State 12th Rank",
      accent: "indigo",
      icon: "BookOpen",
    },
    {
      school: "Vidyanidhi Public School",
      detail: "ICSE",
      years: "2010–2020",
      result: "94.6%",
      accent: "cyan",
      icon: "School",
    },
  ] satisfies EducationItem[],
  navLinks: [
    { id: "about", label: "About", href: "#about" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "research", label: "Research", href: "#research" },
    { id: "contact", label: "Contact", href: "#contact" },
  ] satisfies NavLink[],
  siteTagline: "Full Stack · Gen AI · ML",
  copyrightYear: 2026,
} as const;

export type Profile = typeof profile;
