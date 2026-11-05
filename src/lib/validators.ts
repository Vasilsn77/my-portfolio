/**
 * Shared Zod schemas (client + server).
 * Contact form validation lives here so both sides stay in sync.
 */

import { z } from "zod";

export const contactFormSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(120, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  /** Honeypot — must stay empty */
  website: z.string().max(0).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
