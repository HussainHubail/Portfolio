"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useEffect } from "react";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrambleTextPlugin);
}

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Global GSAP defaults
    gsap.config({
      nullTargetWarn: false,
    });
    
    // Refresh ScrollTrigger on route change or initial load
    ScrollTrigger.refresh();
  }, []);

  return <>{children}</>;
}
