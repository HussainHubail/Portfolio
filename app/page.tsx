import { Hero } from "@/components/home/hero";
import { Highlights } from "@/components/home/highlights";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />

      <Section className="bg-muted/30">
        <Highlights />
      </Section>

      <Section id="project-demo">
        <SectionHeader
          title="Featured Projects"
          description="A showcase of my recent work and notable achievements"
        />
        <FeaturedProjects />
      </Section>

      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">
              Start a Conversation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
