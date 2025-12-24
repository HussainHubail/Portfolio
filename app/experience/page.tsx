import { Section, SectionHeader } from "@/components/ui/section";
import { TimelineItem } from "@/components/experience/timeline-item";
import { experiences } from "@/content/experience";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience, education, and certifications",
};

export default function ExperiencePage() {
  const workExperiences = experiences.filter((exp) => exp.type === "work");
  const educationExperiences = experiences.filter((exp) => exp.type === "education");
  const certifications = experiences.filter((exp) => exp.type === "certification");

  return (
    <>
      <Section className="pt-32 pb-16">
        <SectionHeader
          title="Experience"
          description="My professional journey, education, and continuous learning"
        />

        {/* Work Experience */}
        {workExperiences.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Work Experience</h2>
            <div className="relative">
              {/* Vertical Line - Desktop Only */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
              
              {workExperiences.map((exp, index) => (
                <TimelineItem key={exp.id} experience={exp} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {educationExperiences.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Education</h2>
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
              
              {educationExperiences.map((exp, index) => (
                <TimelineItem key={exp.id} experience={exp} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <TimelineItem key={cert.id} experience={cert} index={index} />
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
