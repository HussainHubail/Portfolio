"use client";

import { motion } from "framer-motion";
import { Code, Users, Award, Zap } from "lucide-react";

const stats = [
  {
    label: "Student Experience",
    value: "5 Years",
    icon: Award,
  },
  {
    label: "Big Project Completed",
    value: "1",
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 text-center hover:scale-105 transition-transform"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <Icon className="w-6 h-6" />
            </div>
            <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
