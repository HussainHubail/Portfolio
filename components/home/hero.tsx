"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Mail, Phone, Linkedin, ExternalLink, FileText, Github } from "lucide-react";
import { profile } from "@/content/profile";
import Link from "next/link";
import { SpotlightCursor } from "@/components/effects/spotlight-cursor";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 },
    });

    tl.from(".hero-content div > *", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      delay: 0.2,
    })
    .from(".scroll-indicator", {
      opacity: 0,
      duration: 1,
    }, "-=0.5");

    // Clean fade in for the role instead of scrambleText
    gsap.from(".hero-role", {
      duration: 1,
      y: 20,
      opacity: 0,
      ease: "power2.out",
      delay: 0.5,
    });

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      gsap.to(".bg-parallax", { x: xPos, y: yPos, duration: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <SpotlightCursor />
      {/* Clean Background */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      </div>

      <div className="section-container hero-content">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium border border-border">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {profile.availability}
            </span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-8xl font-bold mb-6 text-balance tracking-tighter">
            Hi, I'm{" "}
            <span ref={nameRef} className="text-foreground inline-block">
              {profile.name.split(" ")[0]}
            </span>
          </h1>

          {/* Role */}
          <h2 className="hero-role text-2xl md:text-3xl font-medium text-muted-foreground mb-4 tracking-tight min-h-[1.5em]">
            {profile.role}
          </h2>

          {/* Currently Status Chip */}
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium border border-border max-w-full flex-wrap justify-center">
              <span className="text-center">🎓 Graduate from Bahrain Polytechnic · Open to full-time roles</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
            {profile.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <MagneticButton>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 border-primary/20 hover:border-primary">
                <Link href="/contact">
                  <Mail className="w-5 h-5" />
                  Get in Touch
                </Link>
              </Button>
            </MagneticButton>
            
            <MagneticButton>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8">
                <Link href="/projects">
                  View Projects
                </Link>
              </Button>
            </MagneticButton>

            <MagneticButton>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8">
                <a href={profile.resumeUrl} download>
                  <Download className="w-5 h-5" />
                  CV
                </a>
              </Button>
            </MagneticButton>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            {profile.phone && (
              <MagneticButton strength={20}>
                <a
                  href={`tel:${profile.phone}`}
                  className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center hover:bg-accent hover:border-primary transition-colors"
                  aria-label="Call Me"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </MagneticButton>
            )}
            {profile.social.github && (
              <MagneticButton strength={20}>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center hover:bg-accent hover:border-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </MagneticButton>
            )}
            {profile.social.linkedin && (
              <MagneticButton strength={20}>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full border border-primary/10 flex items-center justify-center hover:bg-accent hover:border-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </MagneticButton>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2">
          <ArrowDown className="w-6 h-6 text-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
}
