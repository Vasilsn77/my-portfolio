/**
 * Work & internship experience (newest first).
 * Timeline UI reads from this file only.
 */

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  companyShort: string;
  statusChip?: string;
  dates: string;
  location: string;
  projectTitle?: string;
  summary: string;
  bullets?: string[];
  tags?: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "ltm-incoming",
    // TODO: replace with exact role title when confirmed
    title: "Incoming Software Engineer",
    company: "LTM",
    companyShort: "LTM",
    statusChip: "Joining soon",
    dates: "Joining date TBD",
    location: "Bengaluru",
    summary:
      "Selected through campus placement. Currently upskilling ahead of joining.",
  },
  {
    id: "c3i-research-intern",
    title: "Research Intern",
    company: "C3I, PES University",
    companyShort: "C3I",
    dates: "Jan 2026 – May 2026",
    location: "Bengaluru, Karnataka · On-site",
    projectTitle:
      "Social Media Trend Tracker (SMTT): Real-Time Sentiment Analysis and Topic Modeling Using NLP and ML",
    summary:
      "Developed an end-to-end social media analytics platform to monitor Twitter and Reddit discussions, analyse public sentiment, discover emerging topics, and detect trending conversations using NLP and machine learning.",
    bullets: [
      "Implemented a hybrid sentiment analysis pipeline using VADER, TextBlob, and Twitter-RoBERTa, achieving 87.3% sentiment classification accuracy with RoBERTa.",
      "Applied LDA and NMF topic modelling, achieving a 0.612 topic coherence score using NMF.",
      "Developed engagement-weighted trend detection using temporal frequency analysis and statistical anomaly detection (Z-score > 2).",
      "Built an interactive Streamlit dashboard with sentiment timelines, topic distributions, word clouds, engagement heatmaps, and real-time trend alerts.",
    ],
    tags: [
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
];
