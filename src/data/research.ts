/**
 * Research / publications section content.
 * Optional status and paperUrl can be filled when known.
 */

export type ResearchPaper = {
  id: string;
  title: string;
  subtitle: string;
  field: string;
  authors: string[];
  highlightAuthor: string;
  venue: string;
  year: string;
  dataset: string;
  methods: string;
  summary: string;
  caseStudySlug: string;
  status?: string;
  paperUrl?: string;
};

export const researchLinks = {
  github: "https://github.com/Vasilsn77",
} as const;

export const papers: ResearchPaper[] = [
  {
    id: "llm-unit-test-generation",
    title:
      "Automatic Unit Test Case Generation Using Large Language Models (LLMs)",
    subtitle:
      "Fine-Tuned CodeT5 with MAPS-Inspired Prompt Optimization for Automated Software Testing",
    field: "Generative AI / Software Testing",
    authors: [
      "Suvarna Hiremath",
      "Vijayalaxmi S H",
      "Vasil S N",
      "Bhagya Aski",
      "M. Farida Begam",
    ],
    highlightAuthor: "Vasil S N",
    venue:
      "11th International Conference on ICT for Sustainable Development (ICT4SD 2026)",
    year: "2025–2026",
    dataset: "Methods2Test (cleaned subset) and Defects4J Java benchmark",
    methods:
      "Fine-tuned CodeT5 (770M) with MAPS-inspired iterative prompt optimization, diversity-guided prompt generation, domain context extraction, and failure-driven rule refinement.",
    summary:
      "An LLM-based framework for automated Java unit test generation, combining a fine-tuned CodeT5 model with iterative prompt refinement to improve test structure, assertion coverage, and generation quality.",
    caseStudySlug: "llm-unit-test-generation",
    // status and paperUrl intentionally omitted until confirmed
  },
];
