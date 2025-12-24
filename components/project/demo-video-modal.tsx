"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getYouTubeEmbedUrl } from "@/lib/youtube";

// Update this URL to change the project demo video source
// Supports: mp4/webm files, YouTube, Vimeo, or generic embed URLs
export const DEMO_VIDEO_URL = "https://www.youtube.com/embed/CAJI71hrWQE";

function getVideoType(url: string | null) {
  if (!url) return "unsupported" as const;
  const lowered = url.toLowerCase();
  const isYouTube = lowered.includes("youtube.com") || lowered.includes("youtu.be");
  const isVimeo = lowered.includes("vimeo.com");
  const isFile = lowered.endsWith(".mp4") || lowered.endsWith(".webm") || lowered.startsWith("/");
  if (isYouTube) return "youtube" as const;
  if (isVimeo) return "vimeo" as const;
  if (isFile) return "file" as const;
  return "unsupported" as const;
}

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
  returnFocusRef?: React.RefObject<HTMLButtonElement | null>;
  posterUrl?: string;
}

export function DemoVideoModal({ isOpen, onClose, videoUrl = DEMO_VIDEO_URL, title = "Project Demo", returnFocusRef, posterUrl }: DemoVideoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  const videoType = useMemo(() => getVideoType(videoUrl ?? null), [videoUrl]);
  const supported = videoType !== "unsupported";

  // Handle body scroll lock and focus management
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Autofocus close button
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        // Simple focus trap: close button only actionable element
        const focusable = [closeButtonRef.current].filter(Boolean) as HTMLElement[];
        if (focusable.length === 0) return;
        const currentIndex = focusable.indexOf(document.activeElement as HTMLElement);
        if (currentIndex === -1 || (e.shiftKey && currentIndex === 0)) {
          e.preventDefault();
          focusable[focusable.length - 1].focus();
        } else if (!e.shiftKey && currentIndex === focusable.length - 1) {
          e.preventDefault();
          focusable[0].focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Autoplay setup
  useEffect(() => {
    if (!isOpen) return;
    if (videoType === "file") {
      // HTML5 video will autoplay via attribute
    } else if (videoType === "youtube") {
      const embed = getYouTubeEmbedUrl(videoUrl);
      setIframeSrc(embed);
    } else if (videoType === "vimeo") {
      setIframeSrc(videoUrl.replace("vimeo.com/", "player.vimeo.com/video/") + "?autoplay=1");
    } else {
      setIframeSrc(videoUrl);
    }
  }, [isOpen, videoType, videoUrl]);

  // Stop playback on close
  useEffect(() => {
    if (isOpen) return;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIframeSrc(null); // unmount iframe
    // Return focus to the trigger button
    returnFocusRef?.current?.focus();
  }, [isOpen, returnFocusRef]);
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-video-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-background rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 id="demo-video-title" className="text-lg font-semibold">{title}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close demo video"
            ref={closeButtonRef}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="relative bg-black" style={{ paddingBottom: "56.25%" }}>
          <div className="absolute inset-0">
            {supported ? (
              videoType === "file" ? (
                            <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                              controls
                              autoPlay
                              muted
                              playsInline
                              preload="metadata"
                              poster={posterUrl}
                >
                  <source src={videoUrl} />
                  Your browser does not support the video tag.
                </video>
              ) : iframeSrc ? (
                <iframe
                  key={iframeSrc || "youtube-iframe"}
                  src={iframeSrc || undefined}
                  title="Project Demo Video"
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : null
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                Unable to load video. <a className="underline ml-1" href={videoUrl} target="_blank" rel="noopener noreferrer">Open on YouTube</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
