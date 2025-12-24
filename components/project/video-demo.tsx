"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface VideoDemoProps {
  videoUrl?: string;
  title?: string;
  thumbnailUrl?: string;
  onOpen?: () => void;
}

export function VideoDemo({ videoUrl, title = "Watch Demo", thumbnailUrl, onOpen }: VideoDemoProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Check if URL is a YouTube or Vimeo embed URL
  const isLocalFile = videoUrl?.startsWith("/");
  const isYouTube = videoUrl?.includes("youtube.com") || videoUrl?.includes("youtu.be");
  const isVimeo = videoUrl?.includes("vimeo.com");

  // Convert Vimeo URL to embed format if needed
  const getVimeoEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:vimeo\.com\/)(\d+)/)?.[1];
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
  };

  const getEmbedUrl = (url: string) => {
    if (isLocalFile) return null;
    if (isYouTube) return getYouTubeEmbedUrl(url) || url;
    if (isVimeo) return getVimeoEmbedUrl(url);
    return url;
  };

  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;

  // Show fallback if no video URL
  if (!videoUrl || videoUrl.includes("PUT_VIDEO_EMBED_URL_HERE")) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="bg-muted/50 border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center aspect-video bg-muted rounded-lg border border-border">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground font-medium">Demo video coming soon</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Add your video URL to showcase your project
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // If a thumbnail is provided, show a clickable preview instead of loading the video/iframe here
  if (thumbnailUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="overflow-hidden cursor-pointer group" onClick={onOpen}>
          <div className="relative w-full aspect-video bg-black">
            {/* Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumbnailUrl} alt={`${title} thumbnail`} className="w-full h-full object-cover" />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white shadow-lg flex items-center justify-center transition-colors">
                <Play className="w-8 h-8 text-black" />
              </div>
            </div>
          </div>
          <CardContent>
            <p className="text-sm text-muted-foreground mt-2 text-center">Tap to watch the demo</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            {isLocalFile ? (
              // Local video file
              <video
                controls
                className="w-full h-full object-contain"
                onLoadedData={() => setIsLoading(false)}
                poster="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=600&fit=crop"
                muted
                playsInline
                preload="metadata"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : embedUrl ? (
              // Embedded iframe for YouTube/Vimeo
              <>
                {isLoading && (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center z-10">
                    <div className="animate-pulse text-muted-foreground">Loading video...</div>
                  </div>
                )}
                <iframe
                  src={embedUrl || ""}
                  title={title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setIsLoading(false)}
                />
              </>
            ) : (
              <div className="absolute inset-0 bg-muted flex items-center justify-center">
                <div className="text-muted-foreground">Demo video coming soon</div>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {isLocalFile
              ? (
                <>
                  Click the play button to watch the demo. {" "}
                  <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="underline">Open video</a>
                </>
              )
              : "Click to watch full demonstration of the project"}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
