"use client";

import { useEffect, useState } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { isFunEnabled } from "@/config/funFlags";

export function MoodRing() {
  const reduceMotion = usePrefersReducedMotion();
  const scrollY = useScrollPosition();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isFunEnabled('moodRing') && !reduceMotion);
  }, [reduceMotion]);

  if (!enabled) return null;

  // Change hue based on time of day
  const hour = new Date().getHours();
  const baseHue = (hour * 15) % 360; // 0-360 degrees
  
  // Subtle shift based on scroll
  const scrollHue = (baseHue + scrollY / 10) % 360;

  return (
    <div
      className="fixed bottom-4 left-4 w-16 h-16 rounded-full pointer-events-none z-0 blur-2xl opacity-30 transition-all duration-1000"
      style={{
        background: `radial-gradient(circle, hsl(${scrollHue}, 70%, 60%), transparent)`,
      }}
      aria-hidden="true"
    />
  );
}
