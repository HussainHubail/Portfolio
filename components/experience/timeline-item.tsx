"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { Briefcase, GraduationCap, Award as AwardIcon } from "lucide-react";
import { Experience } from "@/content/experience";

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export function TimelineItem({ experience, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0;
  
  const getIcon = () => {
    switch (experience.type) {
      case "work":
        return Briefcase;
      case "education":
        return GraduationCap;
      case "certification":
        return AwardIcon;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12",
        "mb-12 md:mb-16"
      )}
    >
      {/* Timeline Dot - Desktop */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          {/* Connecting Line */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-24 bg-border" />
        </div>
      </div>

      {/* Content - Desktop Layout */}
      <div
        className={cn(
          "md:col-span-1",
          isLeft ? "md:col-start-1 md:text-right" : "md:col-start-2"
        )}
      >
        <div className="md:hidden mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>

        <Card className="hover:shadow-lg transition-all">
          <CardContent className="pt-6">
            {/* Date */}
            <div className="text-sm text-primary font-medium mb-2">
              {formatDate(experience.startDate)} -{" "}
              {experience.endDate ? formatDate(experience.endDate) : "Present"}
            </div>

            {/* Title & Company */}
            <h3 className="text-2xl font-bold mb-2">{experience.role}</h3>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-lg font-medium text-muted-foreground">
                {experience.company}
              </p>
              <span className="text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground">{experience.location}</p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-4">{experience.description}</p>

            {/* Achievements */}
            {experience.achievements.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-3">Key Achievements:</h4>
                <ul className="space-y-2">
                  {experience.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <Tag key={tech} variant="secondary">
                  {tech}
                </Tag>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty space for opposite side on desktop */}
      <div className="hidden md:block md:col-span-1" />
    </motion.div>
  );
}
