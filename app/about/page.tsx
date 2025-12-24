import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { profile } from "@/content/profile";
import { skillsByCategory, education, certifications } from "@/content/skills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: profile.bio,
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32 pb-16">
        <SectionHeader
          title="About Me"
          description="Learn more about my background, skills, and what drives me"
        />

        {/* Bio Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardContent className="pt-6">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {profile.bio}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm passionate about creating digital experiences that not only look beautiful but also solve real problems. 
                My approach combines technical expertise with a deep understanding of user needs, resulting in products 
                that are both functional and delightful to use.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community through blog posts and mentorship.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsByCategory.map((category) => (
              <Card key={category.category} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Quality First",
                description: "I believe in writing clean, maintainable code and creating products that stand the test of time.",
              },
              {
                title: "Continuous Learning",
                description: "Technology evolves rapidly, and I'm committed to staying current with industry trends and best practices.",
              },
              {
                title: "User-Centric",
                description: "Every technical decision I make is guided by the impact it will have on the end user's experience.",
              },
              {
                title: "Collaboration",
                description: "Great products are built by great teams. I value open communication and knowledge sharing.",
              },
              {
                title: "Innovation",
                description: "I'm always exploring new technologies and approaches to solve problems more effectively.",
              },
              {
                title: "Reliability",
                description: "I deliver on commitments and take ownership of my work from conception to deployment.",
              },
            ].map((value) => (
              <Card key={value.title} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {education.map((edu) => (
              <Card key={edu.degree}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                  <p className="text-lg text-primary mb-2">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground mb-3">{edu.year}</p>
                  <p className="text-muted-foreground">{edu.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.name} className="hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">{cert.name}</h3>
                  <p className="text-sm text-primary mb-1">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground">{cert.year}</p>
                  {cert.credentialId && (
                    <p className="text-xs text-muted-foreground mt-2">
                      ID: {cert.credentialId}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Working Together?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/contact">Get in Touch</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={profile.resumeUrl} download>
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
