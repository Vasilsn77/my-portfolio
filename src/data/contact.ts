/**
 * Contact section copy (form field labels live with the form component,
 * but headings / subcopy / field copy stay editable here).
 */

export const contactContent = {
  heading: "Let’s Connect",
  /** Substring of `heading` rendered with the gradient treatment. */
  headingHighlight: "Connect",
  subheading:
    "Open to AI / agent and software development roles. Always happy to collaborate or chat about GenAI and software. Feel free to reach out!",
  form: {
    emailLabel: "Your Email",
    emailPlaceholder: "you@example.com",
    subjectLabel: "Subject",
    subjectPlaceholder: "Let’s chat!",
    messageLabel: "Message",
    messagePlaceholder: "Hi Vasil, let’s connect!",
    submit: "Send Message",
  },
  successMessage: "Message sent — I’ll get back to you soon.",
  errorMessage: "Something went wrong. Please try again.",
} as const;
