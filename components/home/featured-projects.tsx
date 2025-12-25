"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { projects } from "@/content/projects";

export function FeaturedProjects() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/projects/${project.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all group overflow-hidden">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted transition-transform motion-reduce:transition-none group-hover:translate-y-px">
                  <Image
                    src={project.videoThumbnail || project.images.hero}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform motion-reduce:transition-none group-hover:scale-[1.03]"
                  />
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Tag key={tag} variant="secondary">
                        {tag}
                      </Tag>
                    ))}
                    {project.tags.length > 3 && (
                      <Tag variant="outline">+{project.tags.length - 3}</Tag>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="gap-2">
                  {project.links.live && (
                    <Button size="sm" variant="ghost" asChild>
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.links.github && (
                    <Button size="sm" variant="ghost" asChild>
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Button size="lg" variant="outline" asChild>
          <Link href="/projects">
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
