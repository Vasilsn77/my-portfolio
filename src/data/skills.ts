/**
 * Skills grouped for the skills section + marquee.
 * Icon keys map to Devicon CDN filenames where possible.
 */

export type SkillItem = {
  name: string;
  /** Devicon slug, e.g. "python" → .../python/python-original.svg */
  icon?: string;
  /** Prefer original-wordmark, plain, etc. when needed */
  iconVariant?: string;
};

export type SkillGroup = {
  title: string;
  items: SkillItem[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    items: [
      { name: "Python", icon: "python" },
      { name: "C++", icon: "cplusplus" },
      { name: "C", icon: "c" },
      { name: "Java", icon: "java" },
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css3" },
    ],
  },
  {
    title: "ML Libraries & Frameworks",
    items: [
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "Scikit-learn", icon: "scikitlearn" },
      { name: "NLTK" },
      { name: "OpenCV", icon: "opencv" },
      { name: "Hugging Face" },
    ],
  },
  {
    title: "Web Development",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express", iconVariant: "original" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css3" },
    ],
  },
  {
    title: "Databases & Tools",
    items: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "MySQL", icon: "mysql" },
      { name: "Git", icon: "git" },
      { name: "Docker", icon: "docker" },
      { name: "PyCharm", icon: "pycharm" },
      { name: "VS Code", icon: "vscode" },
      { name: "GitHub", icon: "github", iconVariant: "original" },
      { name: "Google Colab" },
      { name: "Kaggle" },
    ],
  },
];

export const currentlyExploring = [
  "AI Agents",
  "LLM Application Frameworks",
  "System Design",
  "DSA",
] as const;

/** Flat list used by the icon marquee */
export const marqueeSkills: SkillItem[] = skillGroups
  .flatMap((group) => group.items)
  .filter((item, index, all) => {
    return all.findIndex((other) => other.name === item.name) === index;
  });
