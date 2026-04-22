"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { profile } from "@/content/profile";
import { skillsByCategory } from "@/content/skills";
import { Reveal } from "@/components/effects/reveal-animation";
import { Brain, Code2, GraduationCap, Laptop, Lightbulb, Rocket, ShieldCheck, Trophy, Zap } from "lucide-react";

export function AboutBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 max-w-6xl mx-auto h-auto md:h-[1000px]">
      {/* Main Bio - Large Top Left */}
      <Reveal direction="up" className="md:col-span-2 md:row-span-2">
        <Card className="h-full border-primary/10 bg-primary/5 backdrop-blur-sm group hover:border-primary/30 transition-colors">
          <CardHeader>
            <div className="flex justify-center md:justify-start mb-4">
              <div className="relative w-24 h-24 rounded-full ring-4 ring-primary/20 overflow-hidden bg-primary/10 flex items-center justify-center">
                <Image
                  src="/profile.jpg"
                  alt={profile.name}
                  fill
                  className="object-cover"
                  onError={(e) => { 
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                />
                {/* Fallback initials — always rendered behind the image or shown if image fails */}
                <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary select-none -z-10">HH</span>
              </div>
            </div>
            <CardTitle className="text-3xl font-extrabold flex items-center gap-3">
              <Brain className="w-8 h-8 text-primary" />
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {profile.bio}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I&apos;m a senior ICT student based in Bahrain who enjoys building things that actually work. Outside of coding, I spend time at the gym and gaming — both of which keep me sane. I&apos;m looking to join a team after graduation where I can grow as a developer and work on real problems.
            </p>
          </CardContent>
        </Card>
      </Reveal>

      {/* Stats/Quick Info - Top Right */}
      <Reveal direction="up" delay={0.1} className="md:col-span-2 md:row-span-1">
        <Card className="h-full border-primary/5 hover:border-primary/20 transition-all">
          <CardContent className="pt-6 grid grid-cols-2 gap-4 h-full">
            <div className="flex flex-col justify-center items-center text-center p-4 rounded-xl bg-muted/50">
              <GraduationCap className="w-6 h-6 mb-2 text-primary" />
              <span className="text-2xl font-bold">Senior</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Status</span>
            </div>
            <div className="flex flex-col justify-center items-center text-center p-4 rounded-xl bg-muted/50">
              <Laptop className="w-6 h-6 mb-2 text-primary" />
              <span className="text-2xl font-bold">5+ Yrs</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Experience</span>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      {/* Skills Highlight - Middle Right */}
      <Reveal direction="up" delay={0.2} className="md:col-span-2 md:row-span-1">
        <Card className="h-full border-primary/5 hover:border-primary/20 transition-all overflow-hidden relative group">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              Top Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "PostgreSQL", "Node.js", "TypeScript"].map(s => (
                <Tag key={s} variant="secondary" className="bg-primary/10">{s}</Tag>
              ))}
            </div>
          </CardContent>
          <Zap className="absolute -bottom-4 -right-4 w-24 h-24 text-primary/5 group-hover:text-primary/10 transition-colors" />
        </Card>
      </Reveal>

      {/* Full Skills List - Middle Left */}
      <Reveal direction="up" delay={0.3} className="md:col-span-2 md:row-span-2">
        <Card className="h-full border-primary/5 hover:border-primary/20 transition-all">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Rocket className="w-6 h-6 text-primary" />
              Technical Arsenal
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillsByCategory.slice(0, 4).map(cat => (
              <div key={cat.category} className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-tighter text-primary/70">{cat.category}</h4>
                <div className="flex flex-wrap gap-1">
                  {cat.skills.slice(0, 4).map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded bg-muted border border-border">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </Reveal>

      {/* Values - Bottom Row */}
      <Reveal direction="up" delay={0.4} className="md:col-span-1 md:row-span-1">
        <Card className="h-full border-primary/5 hover:bg-primary/5 transition-colors group">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <ShieldCheck className="w-10 h-10 mb-3 text-primary group-hover:scale-110 transition-transform" />
            <h4 className="font-bold">Reliability</h4>
            <p className="text-xs text-muted-foreground mt-1">Consistency in every commit.</p>
          </CardContent>
        </Card>
      </Reveal>

      <Reveal direction="up" delay={0.5} className="md:col-span-1 md:row-span-1">
        <Card className="h-full border-primary/5 hover:bg-primary/5 transition-colors group">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Lightbulb className="w-10 h-10 mb-3 text-primary group-hover:scale-110 transition-transform" />
            <h4 className="font-bold">Innovation</h4>
            <p className="text-xs text-muted-foreground mt-1">Always exploring new tech.</p>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
