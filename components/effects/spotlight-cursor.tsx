"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { features } from "@/config/features";

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
}

export function SpotlightCursor() {
  const reduceMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const rafId = useRef<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ok = features.spotlightCursor && !reduceMotion && !isTouchDevice();
    setEnabled(ok);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null;
          const el = elRef.current;
          if (!el) return;
          el.style.setProperty("--x", `${pos.current.x}px`);
          el.style.setProperty("--y", `${pos.current.y}px`);
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={elRef}
      className="pointer-events-none absolute inset-0 -z-0"
      style={{
        // Subtle spotlight following the cursor
        background:
          "radial-gradient(300px at var(--x) var(--y), rgba(255,255,255,0.08), transparent 60%)",
        transition: "background 120ms linear",
      }}
      aria-hidden="true"
    />
  );
}
