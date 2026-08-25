"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { ArrowRight, ExternalLink, Phone } from "lucide-react";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/effects/reveal-animation";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function FeaturedProjects() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug} direction="up" delay={index * 0.1}>
            <Card className="h-full border-primary/5 hover:border-primary/20 transition-colors duration-500 overflow-hidden bg-card/50 backdrop-blur-sm group">
              {/* Image Link */}
              <Link href={`/projects/${project.slug}`} className="relative h-56 w-full overflow-hidden bg-muted block">
                <Image
                  src={project.videoThumbnail || project.images.hero}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {project.status && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-secondary/80 backdrop-blur-md text-secondary-foreground text-xs font-medium shadow-sm border border-border">
                    {project.status}
                  </div>
                )}
              </Link>

              <CardHeader className="space-y-1">
                <Link href={`/projects/${project.slug}`} className="block group/title">
                  <CardTitle className="text-2xl font-bold group-hover/title:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                </Link>
                <CardDescription className="line-clamp-2 text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag} variant="secondary" className="bg-primary/5 text-primary/80 border-primary/10">
                      {tag}
                    </Tag>
                  ))}
                  {project.tags.length > 3 && (
                    <Tag variant="outline" className="opacity-60">+{project.tags.length - 3}</Tag>
                  )}
                </div>
              </CardContent>

              <CardFooter className="gap-3 pt-0 mt-auto">
                {project.links.live && (
                  <Button size="sm" variant="ghost" asChild className="rounded-full hover:bg-primary/10 hover:text-primary">
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {profile.phone && (
                  <Button size="sm" variant="ghost" asChild className="rounded-full hover:bg-primary/10 hover:text-primary">
                    <a
                      href={`tel:${profile.phone}`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <MagneticButton>
          <Button size="lg" variant="outline" asChild className="rounded-full px-10 group">
            <Link href="/projects">
              Explore All Projects
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </MagneticButton>
      </div>
    </div>
  );
}
