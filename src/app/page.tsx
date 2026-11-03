import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";

/**
 * Home page — sections added phase by phase.
 * Remaining: Projects, Research, Skills, Certifications, Contact, Footer.
 */
export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <About />
      <Experience />

      {/* Placeholders so nav / command palette section targets exist early */}
      <section id="projects" className="sr-only" aria-hidden="true" />
      <section id="research" className="sr-only" aria-hidden="true" />
      <section id="contact" className="sr-only" aria-hidden="true" />
    </main>
  );
}
