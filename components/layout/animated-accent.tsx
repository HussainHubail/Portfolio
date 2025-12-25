"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function AnimatedAccent() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    let raf: number | null = null;
    let t = 0;
    const el = ref.current;

    const tick = () => {
      t += 0.006;
      const x = Math.sin(t) * 20;
      const y = Math.cos(t * 0.8) * 20;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      } else if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed -z-10 top-1/4 left-1/3 w-[40vmax] h-[40vmax] rounded-full blur-3xl opacity-20"
      style={{
        background:
          "radial-gradient(circle at center, rgba(99,102,241,0.4), rgba(34,211,238,0.2) 60%, transparent 70%)",
      }}
    />
  );
}
