/**
 * Projects for the grid and case-study pages.
 * Optional `image` can be filled later with real screenshots.
 */

export type ProjectCategory =
  | "AI & ML"
  | "Full Stack & Apps"
  | "Systems & Security";

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  featured?: boolean;
  summary: string;
  bullets?: string[];
  features?: string[];
  pipeline?: string[];
  useCases?: string[];
  /** Optional results/metrics shown on the case study. Only rendered when set. */
  highlights?: string[];
  tech: string[];
  repoUrl?: string;
  image?: string;
  /** Extra context shown on case-study / cards */
  contextNote?: string;
};

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "AI & ML",
  "Full Stack & Apps",
  "Systems & Security",
];

export const projects: Project[] = [
  {
    slug: "llm-unit-test-generation",
    title: "Automatic Unit Test Case Generation Using LLMs",
    subtitle:
      "Fine-Tuned CodeT5 with MAPS-Inspired Prompt Optimization for Automated Software Testing",
    category: "AI & ML",
    featured: true,
    summary:
      "An LLM-based framework for automated Java unit test generation, combining a fine-tuned CodeT5 model with iterative prompt refinement to improve test structure, assertion coverage, and generation quality.",
    bullets: [
      "Fine-tuned Salesforce CodeT5 (770M) on a cleaned subset of the Methods2Test dataset, filtering approximately 43.5% noisy or misaligned samples to improve training data quality.",
      "Designed a MAPS-inspired prompt optimization pipeline with domain context extraction, diversity-guided prompt generation, and failure-driven rule refinement.",
      "Generated and evaluated JUnit-style tests using heuristic metrics for syntactic validity, assertions, test annotations, and structural completeness.",
      "Evaluated on real-world Java projects from the Defects4J benchmark, identifying structural-quality improvements while analysing limitations such as prompt-induced overfitting and semantic correctness.",
    ],
    tech: [
      "Python",
      "Java",
      "Generative AI",
      "LLMs",
      "CodeT5",
      "PyTorch",
      "Hugging Face Transformers",
      "Prompt Engineering",
      "NLP",
      "Methods2Test",
      "Defects4J",
      "JUnit",
      "CUDA",
      "TensorBoard",
    ],
  },
  {
    slug: "social-media-trend-tracker",
    title: "Social Media Trend Tracker (SMTT)",
    category: "AI & ML",
    featured: true,
    summary:
      "Developed an end-to-end social media analytics platform to monitor Twitter and Reddit discussions, analyse public sentiment, discover emerging topics, and detect trending conversations using NLP and machine learning.",
    contextNote: "Built during the research internship at C3I, PES University.",
    bullets: [
      "Implemented a hybrid sentiment analysis pipeline using VADER, TextBlob, and Twitter-RoBERTa, achieving 87.3% sentiment classification accuracy with RoBERTa.",
      "Applied LDA and NMF topic modelling, achieving a 0.612 topic coherence score using NMF.",
      "Developed engagement-weighted trend detection using temporal frequency analysis and statistical anomaly detection (Z-score > 2).",
      "Built an interactive Streamlit dashboard with sentiment timelines, topic distributions, word clouds, engagement heatmaps, and real-time trend alerts.",
    ],
    tech: [
      "Python",
      "NLP",
      "Machine Learning",
      "Hugging Face Transformers",
      "Twitter API",
      "Reddit API",
      "Tweepy",
      "PRAW",
      "VADER",
      "TextBlob",
      "RoBERTa",
      "LDA",
      "NMF",
      "Scikit-learn",
      "NLTK",
      "Pandas",
      "Streamlit",
    ],
  },
  {
    slug: "health-wellness-tracker",
    title: "Health & Wellness Tracker",
    category: "Full Stack & Apps",
    summary:
      "A Flask web app to track physical and mental health, set wellness goals, and connect with friends who share similar objectives.",
    features: [
      "User registration, login, and logout with session handling and profile management",
      "Mood and stress logging with history",
      "Exercise logging with calories burned and activity stats",
      "Custom goals with progress visualisation",
      "Friends system (add, accept/reject, list)",
      "Dashboard with health metrics, goal progress, and recent activity",
    ],
    tech: [
      "Python",
      "Flask",
      "MySQL",
      "HTML",
      "CSS",
      "JavaScript",
      "Jinja2",
      "Session-based auth",
    ],
    repoUrl: "https://github.com/Vasilsn77/health_and_wellness_tracker",
  },
  {
    slug: "tcp-udp-port-scanner",
    title: "TCP/UDP Port Scanner",
    category: "Systems & Security",
    summary:
      "A GUI network tool that scans IPs or domains for open TCP and UDP ports and identifies the services running on them.",
    features: [
      "Tkinter GUI",
      "Multi-threaded scanning with up to 2048 concurrent threads",
      "SSL/TLS support (e.g. port 443)",
      "Clear results of open ports and services",
      "Supports single ports, lists, ranges, or full 1–65535 scans",
    ],
    tech: ["Python", "Tkinter", "Sockets", "SSL/TLS", "Threading"],
    repoUrl: "https://github.com/Vasilsn77/TCP-UDP-port-scanner",
  },
  {
    slug: "solubility-predictor",
    title: "Molecule Solubility Predictor",
    category: "AI & ML",
    summary:
      "A machine learning pipeline that predicts the aqueous solubility of molecules, a key factor in drug discovery and chemical research.",
    pipeline: [
      "Data loading & cleaning",
      "Feature/target split with train-test split",
      "Training multiple models",
      "Prediction on unseen data",
      "Evaluation with MSE and R-squared",
    ],
    useCases: [
      "Drug discovery",
      "Chemical synthesis planning",
      "Environmental impact",
    ],
    tech: ["Python", "Jupyter", "Scikit-learn", "Pandas", "NumPy"],
    repoUrl: "https://github.com/Vasilsn77/Solubility-Predictor",
  },
  {
    slug: "meditation-session-generator",
    title: "Personalized Meditation Session Generator",
    category: "Full Stack & Apps",
    summary:
      "A Streamlit app that generates a tailored meditation script from your mood and the time you have available.",
    features: [
      "Mood-based personalization (e.g. Relaxed, Stressed, Anxious)",
      "Session length from 5 to 60 minutes",
      "Dynamic script generation",
      "Unit tests for input-processing logic",
    ],
    tech: ["Python", "Streamlit", "unittest"],
    repoUrl: "https://github.com/Vasilsn77/Meditation-AI",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev?: Project;
  next?: Project;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
