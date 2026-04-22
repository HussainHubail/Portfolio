"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { features } from "@/config/features";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
}

export function SpotlightCursor() {
  const reduceMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ok = features.spotlightCursor && !reduceMotion && !isTouchDevice();
    setEnabled(ok);
  }, [reduceMotion]);

  useGSAP(() => {
    if (!enabled || !elRef.current) return;

    const xTo = gsap.quickTo(elRef.current, "--x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(elRef.current, "--y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={elRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        background: "radial-gradient(400px at var(--x, 0px) var(--y, 0px), rgba(255,255,255,0.05), transparent 80%)",
      }}
      aria-hidden="true"
    />
  );
}
