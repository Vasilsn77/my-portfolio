/**
 * Certifications with verify links.
 * Titles are TODO until confirmed — render gracefully in UI.
 */

export type Certification = {
  id: string;
  /** Placeholder until real title is confirmed */
  title: string;
  titleIsPlaceholder: boolean;
  issuer: string;
  verifyUrl: string;
};

export type Achievement = {
  id: string;
  /** Big gradient value, e.g. "97.4%". */
  value: string;
  /** Small muted caption under the value. */
  caption: string;
};

/** Compact achievement highlights (gold trophy row). */
export const achievements: Achievement[] = [
  { id: "puc-rank", value: "97.4%", caption: "PU College, State 12th Rank" },
  { id: "cgpa", value: "7.81", caption: "CGPA, PES University (B.Tech CSE)" },
  { id: "research", value: "1", caption: "Research Paper, ICT4SD 2026" },
];

export const certifications: Certification[] = [
  {
    id: "scaler-1",
    // TODO: replace with real Scaler certificate title
    title: "Scaler Certification",
    titleIsPlaceholder: true,
    issuer: "Scaler",
    verifyUrl: "https://moonshot.scaler.com/s/sl/506tBZbeY8",
  },
  {
    id: "scaler-2",
    // TODO: replace with real Scaler certificate title
    title: "Scaler Certification",
    titleIsPlaceholder: true,
    issuer: "Scaler",
    verifyUrl: "https://moonshot.scaler.com/s/sl/SSgo5_vaQw",
  },
  {
    id: "hackerrank-1",
    // TODO: replace with real HackerRank certificate title
    title: "HackerRank Certificate",
    titleIsPlaceholder: true,
    issuer: "HackerRank",
    verifyUrl: "https://www.hackerrank.com/certificates/iframe/f6ec8fd8b001",
  },
];
