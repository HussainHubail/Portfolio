"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set(curtainRef.current, { scaleY: 1 });
    gsap.set(containerRef.current, { opacity: 0, y: 20 });

    tl.to(curtainRef.current, {
      scaleY: 0,
      duration: 0.8,
      ease: "power4.inOut",
      transformOrigin: "top",
    })
    .to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    }, "-=0.3");

  }, [pathname]);

  return (
    <div className="relative overflow-hidden">
      {/* Transition Curtain */}
      <div 
        ref={curtainRef}
        className="fixed inset-0 z-[100] bg-primary pointer-events-none origin-top"
        style={{ transform: "scaleY(0)" }}
      />
      
      <div ref={containerRef}>
        {children}
      </div>
    </div>
  );
}
