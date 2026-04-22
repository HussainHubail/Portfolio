import { Hero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/effects/reveal-animation";
import { MagneticButton } from "@/components/ui/magnetic-button";

export default function Home() {
  return (
    <>
      <Hero />

      <Section className="bg-muted/30">
        <Reveal direction="up">
          <Highlights />
        </Reveal>
      </Section>

      <Section id="project-demo">
        <Reveal direction="up">
          <SectionHeader
            title="Featured Projects"
            description="A showcase of my recent work and notable achievements"
          />
        </Reveal>
        <FeaturedProjects />
      </Section>

      <Section>
        <Reveal direction="up" className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
          <MagneticButton>
            <Button size="lg" asChild className="rounded-full px-10 h-14 text-lg">
              <Link href="/contact">
                Start a Conversation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </MagneticButton>
        </Reveal>
      </Section>
    </>
  );
}
