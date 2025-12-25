"use client";

import { use, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Section } from "@/components/ui/section";
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react";
import { projects } from "@/content/projects";
import { VideoDemo } from "@/components/project/video-demo";
import { DeploymentInfo } from "@/components/project/deployment-info";
import { DemoVideoModal } from "@/components/project/demo-video-modal";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const project = projects.find((p) => p.slug === slug);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const demoButtonRef = useRef<HTMLButtonElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  if (!project) {
    notFound();
  }

  const allImages = [project.images.hero, ...project.images.gallery];
  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const demoVideoUrl = project.videoUrl;
  const demoType = demoVideoUrl ? demoVideoUrl.toLowerCase() : "";
  const isSupportedDemo =
    demoType.includes("youtube.com") ||
    demoType.includes("youtu.be") ||
    demoType.includes("vimeo.com") ||
    demoType.endsWith(".mp4") ||
    demoType.endsWith(".webm") ||
    demoType.startsWith("/");

  const handleOpenDemo = () => {
    if (!isSupportedDemo && demoVideoUrl) {
      window.open(demoVideoUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setIsDemoOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoOpen(false);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(searchParams?.toString());
      params.delete("demo");
      router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
    }
  };

  // Open modal if URL contains ?demo=1
  useEffect(() => {
    const demo = searchParams?.get("demo");
    if (demo === "1" && !isDemoOpen) {
      setIsDemoOpen(true);
    }
  }, [searchParams, isDemoOpen]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((prev) => (prev! + 1) % allImages.length);
  const prevImage = () => setLightboxIndex((prev) => (prev! - 1 + allImages.length) % allImages.length);

  return (
    <>
      {/* Hero + Main Content with Background Image */}
      <section className="relative">
        {/* Background Image - only visible in hero section */}
        <div className="absolute top-0 left-0 w-full h-screen -z-10 pointer-events-none">
          <Image
            src={project.images.hero}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-background" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-20 pb-20 text-white min-h-screen flex items-center">
          <div className="section-container w-full">
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="mb-6 text-white hover:text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Button>
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{project.title}</h1>
              <p className="text-xl text-white/95 mb-6 max-w-3xl drop-shadow-md">{project.longDescription}</p>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                {demoVideoUrl ? (
                  <Button size="lg" variant="secondary" onClick={handleOpenDemo} ref={demoButtonRef}>
                    Watch Demo
                  </Button>
                ) : project.links.live ? (
                  <Button size="lg" variant="secondary" asChild>
                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5" />
                      Open Web App
                    </a>
                  </Button>
                ) : null}
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm drop-shadow">
                  <span className="font-medium">Role:</span>
                  <span className="text-white/90">{project.role}</span>
                </div>
                <div className="flex items-center gap-2 text-sm drop-shadow">
                  <span className="font-medium">Year:</span>
                  <span className="text-white/90">{project.year}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <Section className="bg-background/80 backdrop-blur-sm py-8 relative z-20">
          <div className="flex flex-wrap gap-4 justify-center">
            {project.links.live && (
              <Button size="lg" asChild>
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.links.github && (
              <Button size="lg" variant="outline" asChild>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  View Source Code
                </a>
              </Button>
            )}
          </div>
        </Section>

        {/* Main Content */}
        <Section className="bg-background relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-8 space-y-12">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.problem}</p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">The Solution</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{project.solution}</p>
            </motion.div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Impact & Results</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.impact.map((item) => (
                  <Card key={item.metric}>
                    <CardContent className="pt-6 text-center">
                      <div className="text-xl md:text-2xl font-bold text-primary mb-1">{item.value}</div>
                      <div className="text-xs md:text-sm text-muted-foreground">{item.metric}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <ul className="space-y-3">
                {project.keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Technical Challenges</h2>
              <div className="space-y-4">
                {project.challenges.map((challenge) => (
                  <Card key={challenge}>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground">{challenge}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Learnings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Key Learnings</h2>
              <ul className="space-y-3">
                {project.learnings.map((learning) => (
                  <li key={learning} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-muted-foreground">{learning}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {demoVideoUrl ? (
              <>
                <Button size="lg" variant="secondary" onClick={(e) => {
                  e.preventDefault();
                  const params = new URLSearchParams(searchParams?.toString());
                  params.set("demo", "1");
                  router.replace(`${pathname}?${params.toString()}`);
                  setIsDemoOpen(true);
                }}>
                  Watch Demo
                </Button>
                {/* Video Demo */}
                <VideoDemo
                  videoUrl={project.videoUrl}
                  title="Watch Demo"
                  thumbnailUrl={project.videoThumbnail}
                  onOpen={() => setIsDemoOpen(true)}
                />
              </>
            ) : project.links.live ? (
              <Button size="lg" asChild>
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5" />
                  Open Web App
                </a>
              </Button>
            ) : null}

            {/* Deployment Info */}
            <DeploymentInfo projectTitle={project.title} liveUrl={project.links.live} />

            {/* Tech Stack */}
            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag} variant="secondary">{tag}</Tag>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </Section>
      </section>

      {/* Image Gallery */}
      {project.images.gallery.length > 0 && (
        <Section className="bg-muted/30">
          <h2 className="text-3xl font-bold mb-8 text-center">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allImages.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => openLightbox(index)}
                className="relative aspect-video overflow-hidden rounded-lg group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </motion.button>
            ))}
          </div>
        </Section>
      )}

      {/* More Projects */}
      {otherProjects.length > 0 && (
        <Section>
          <h2 className="text-3xl font-bold mb-8 text-center">More Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((otherProject) => (
              <Link key={otherProject.slug} href={`/projects/${otherProject.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all group overflow-hidden">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={otherProject.images.hero}
                      alt={otherProject.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {otherProject.title}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="relative w-full h-full max-w-6xl max-h-[90vh] m-4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={allImages[lightboxIndex]}
              alt={`${project.title} image ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}

      {demoVideoUrl && (
        <DemoVideoModal
          isOpen={isDemoOpen}
          onClose={handleCloseDemo}
          videoUrl={demoVideoUrl}
          title={`${project.title} Demo`}
          returnFocusRef={demoButtonRef}
          posterUrl={project.videoThumbnail}
        />
      )}
    </>
  );
}
