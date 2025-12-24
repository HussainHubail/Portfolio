"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO at TechStart",
    content: "Working with Hussain was an absolute pleasure. His technical expertise and attention to detail resulted in a product that exceeded our expectations.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Product Manager at InnovateCo",
    content: "Hussain's ability to translate complex requirements into elegant solutions is remarkable. He's a true professional who consistently delivers quality work.",
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder of DesignHub",
    content: "Not only is Hussain technically proficient, but he also brings creative problem-solving to every project. Highly recommended!",
    avatar: "ER",
  },
];

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-all">
            <CardContent className="pt-6">
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-muted-foreground mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
