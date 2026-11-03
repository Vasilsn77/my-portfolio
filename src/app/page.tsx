import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";
import { Skills } from "@/components/sections/Skills";
import { Footer } from "@/components/layout/Footer";
import { hasCvFile } from "@/lib/assets";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Home page. Section order per the project brief:
 * Hero → About → Experience → Projects → Research → Skills → Certifications →
 * Contact → Footer.
 */
export default function Home() {
  const cvAvailable = hasCvFile();

  return (
    <main id="main-content" className="flex-1">
      <Hero cvAvailable={cvAvailable} />
      <About />
      <Experience />
      <Projects />
      <Research />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
