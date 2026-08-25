import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen } from "lucide-react";
import { profile } from "@/content/profile";
import { education } from "@/content/skills";
import { Metadata } from "next";
import { Reveal } from "@/components/effects/reveal-animation";
import { AboutBentoGrid } from "@/components/about/bento-grid";
import { MagneticButton } from "@/components/ui/magnetic-button";

export const metadata: Metadata = {
  title: "About",
  description: profile.bio,
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32 pb-16">
        <Reveal direction="up">
          <SectionHeader
            title="Design. Code. Database."
            description="A recent ICT Database Systems graduate from Bahrain Polytechnic with independent client experience."
          />
        </Reveal>

        {/* Bento Grid */}
        <div className="mb-24">
          <AboutBentoGrid />
        </div>

        {/* Education */}
        <div className="mb-24 max-w-3xl mx-auto">
          <Reveal direction="up">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <Card key={edu.degree} className="border-primary/5">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                    <p className="text-lg text-primary mb-2 font-medium">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground mb-3 font-mono">{edu.year}</p>
                    <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal direction="up" className="text-center bg-muted/30 py-20 rounded-3xl border border-primary/5">
          <h2 className="text-4xl font-bold mb-6">Let's build the future together</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether it's a complex database architecture or a high-performance web app, I'm ready to help you bring your vision to life.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <MagneticButton>
              <Button size="lg" asChild className="rounded-full px-10 h-14 text-lg">
                <a href="/contact">Start a Project</a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button size="lg" variant="outline" asChild className="rounded-full px-10 h-14 text-lg">
                <a href={profile.resumeUrl} download>
                  <Download className="w-5 h-5 mr-2" />
                  Get CV
                </a>
              </Button>
            </MagneticButton>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
