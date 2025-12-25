"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { isFunEnabled } from "@/config/funFlags";

interface Sparkle {
  x: number;
  y: number;
  size: number;
  life: number;
  vx: number;
  vy: number;
}

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
}

export function SparkleTrail() {
  const reduceMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const rafId = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0, moving: false });

  useEffect(() => {
    const ok = isFunEnabled('sparkleTrail') && !reduceMotion && !isTouchDevice();
    setEnabled(ok);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY, moving: true };
      
      // Add sparkle occasionally (not every frame)
      if (Math.random() < 0.3 && sparklesRef.current.length < 20) {
        sparklesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1,
          life: 1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw sparkles
      sparklesRef.current = sparklesRef.current.filter((s) => {
        s.life -= 0.02;
        s.x += s.vx;
        s.y += s.vy;
        
        if (s.life <= 0) return false;

        ctx.save();
        ctx.globalAlpha = s.life;
        ctx.fillStyle = "#fbbf24"; // Amber color
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        
        return true;
      });

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden="true"
    />
  );
}
