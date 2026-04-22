"use client";

import { Code, Users, Award, Zap } from "lucide-react";
import { Reveal } from "@/components/effects/reveal-animation";
import { MagneticButton } from "@/components/ui/magnetic-button";

const stats = [
  {
    label: "Student Experience",
    value: "5 Years",
    icon: Award,
  },
  {
    label: "Projects Shipped",
    value: "3",
    icon: Code,
  },
  {
    label: "Technologies",
    value: "20+",
    icon: Zap,
  },
  {
    label: "Skills Mastered",
    value: "Full Stack",
    icon: Users,
  },
];

export function Highlights() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Reveal
            key={stat.label}
            direction="up"
            delay={index * 0.1}
            className="group"
          >
            <div className="flex flex-col items-center">
              <MagneticButton strength={30} className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500 shadow-xl shadow-primary/5">
                  <Icon className="w-10 h-10" />
                </div>
              </MagneticButton>
              <div className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tighter">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
