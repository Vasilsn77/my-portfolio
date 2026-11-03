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
