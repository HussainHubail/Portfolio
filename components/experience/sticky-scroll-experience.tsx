"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Experience } from "@/content/experience";
import { formatDate } from "@/lib/utils";
import { Briefcase, MapPin, Calendar } from "lucide-react";

interface StickyExperienceProps {
  experiences: Experience[];
}

export function StickyExperience({ experiences }: StickyExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.innerWidth < 768) return; // Only for desktop

    const items = gsap.utils.toArray<HTMLElement>(".experience-item");
    
    items.forEach((item, i) => {
      const year = item.querySelector(".experience-year");
      
      gsap.to(year, {
        scrollTrigger: {
          trigger: item,
          start: "top 20%",
          end: "bottom 80%",
          pin: year,
          pinSpacing: false,
          scrub: true,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="max-w-6xl mx-auto space-y-32 py-20">
      {experiences.map((exp, index) => (
        <div key={exp.id} className="experience-item grid grid-cols-1 md:grid-cols-12 gap-8 relative">
          {/* Year - Pinned on the left */}
          <div className="md:col-span-3 hidden md:block">
            <div className="experience-year sticky top-40 bg-background/80 backdrop-blur-md p-6 rounded-2xl border border-primary/10 shadow-xl shadow-primary/5">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-primary tracking-tighter">
                  {new Date(exp.startDate).getFullYear()}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">
                  {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                </span>
              </div>
            </div>
          </div>

          {/* Content - Scrolls on the right */}
          <div className="md:col-span-9">
            <Card className="border-primary/5 bg-card/50 backdrop-blur-sm overflow-hidden group hover:border-primary/20 transition-colors duration-500">
              <CardContent className="p-0">
                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-medium text-primary/70">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
                      <Briefcase className="w-4 h-4" />
                      {exp.type.toUpperCase()}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
                      <Calendar className="w-4 h-4" />
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <p className="text-2xl font-semibold text-muted-foreground mb-8">
                    {exp.company}
                  </p>

                  <p className="text-xl text-muted-foreground/80 leading-relaxed mb-10 max-w-3xl">
                    {exp.description}
                  </p>

                  {exp.achievements.length > 0 && (
                    <div className="space-y-6 mb-10">
                      <h4 className="text-lg font-bold uppercase tracking-widest text-primary/60">Core Contributions</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground leading-snug">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-primary/5">
                    {exp.technologies.map((tech) => (
                      <Tag key={tech} variant="secondary" className="px-4 py-1 text-sm bg-primary/5 text-primary border-primary/10">
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
