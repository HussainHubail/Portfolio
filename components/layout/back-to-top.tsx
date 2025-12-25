"use client";

import { ArrowUp } from "lucide-react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function BackToTop() {
  const y = useScrollPosition();
  const reduced = usePrefersReducedMotion();
  const visible = y > 400;

  const onClick = () => {
    if (reduced) {
      window.scrollTo({ top: 0 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 rounded-full border bg-background/80 backdrop-blur-md shadow-md p-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
