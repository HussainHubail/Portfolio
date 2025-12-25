"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Mail, Github, Linkedin, ExternalLink, FileText } from "lucide-react";
import { profile } from "@/content/profile";
import Link from "next/link";
import { SpotlightCursor } from "@/components/effects/spotlight-cursor";

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <SpotlightCursor />
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        className="section-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {profile.availability}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 text-balance"
          >
            Hi, I'm{" "}
            <span className="gradient-text">
              {profile.name.split(" ")[0]}
            </span>
          </motion.h1>

          {/* Role */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6"
          >
            {profile.role}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance"
          >
            {profile.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <Button size="lg" asChild>
              <Link href="/contact">
                <Mail className="w-5 h-5" />
                Get in Touch
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">
                View Projects
              </Link>
            </Button>
            {profile.portfolioUrl && !profile.portfolioUrl.includes("PUT_PORTFOLIO_LIVE_URL_HERE") && (
              <Button size="lg" variant="secondary" asChild>
                <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5" />
                  View Live Portfolio
                </a>
              </Button>
            )}
            <Button size="lg" variant="ghost" asChild>
              <a href={profile.resumeUrl} download>
                <Download className="w-5 h-5" />
                Download CV
              </a>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <a href="/recommendation-letter.pdf" download>
                <FileText className="w-5 h-5" />
                Recommendation
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4"
          >
            {profile.social.github && (
              <a
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-accent hover:border-primary transition-all hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {profile.social.linkedin && (
              <a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-accent hover:border-primary transition-all hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
