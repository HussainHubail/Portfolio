import { Section, SectionHeader } from "@/components/ui/section";
import { experiences } from "@/content/experience";
import { Metadata } from "next";
import { StickyExperience } from "@/components/experience/sticky-scroll-experience";
import { Reveal } from "@/components/effects/reveal-animation";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience, education, and certifications",
};

export default function ExperiencePage() {
  const workExperiences = experiences.filter((exp) => exp.type === "work");
  const educationExperiences = experiences.filter((exp) => exp.type === "education");

  return (
    <>
      <Section className="pt-32 pb-16">
        <Reveal direction="up">
          <SectionHeader
            title="The Journey"
            description="A timeline of professional milestones and academic achievements."
          />
        </Reveal>

        {/* Work Experience */}
        {workExperiences.length > 0 && (
          <div className="mb-24">
            <Reveal direction="up">
              <h2 className="text-4xl font-bold mb-4 text-center tracking-tight">Professional Experience</h2>
              <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-16" />
            </Reveal>
            <StickyExperience experiences={workExperiences} />
          </div>
        )}

        {/* Education */}
        {educationExperiences.length > 0 && (
          <div>
            <Reveal direction="up">
              <h2 className="text-4xl font-bold mb-4 text-center tracking-tight">Education & Foundation</h2>
              <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-16" />
            </Reveal>
            <StickyExperience experiences={educationExperiences} />
          </div>
        )}
      </Section>
    </>
  );
}
