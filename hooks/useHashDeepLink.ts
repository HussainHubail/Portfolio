"use client";

import { useEffect } from "react";
import { features } from "@/config/features";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function useHashDeepLink() {
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!features.hashDeepLinks) return;

    const scrollToHash = () => {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (!hash || hash.length <= 1) return;
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      // Ensure focusability then focus for accessibility
      const prevTabIndex = el.getAttribute("tabindex");
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });

      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

      // Restore tabindex after a tick
      setTimeout(() => {
        if (prevTabIndex === null) {
          el.removeAttribute("tabindex");
        } else {
          el.setAttribute("tabindex", prevTabIndex);
        }
      }, 500);
    };

    // Run on mount (initial hash) and on hash changes
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    window.addEventListener("popstate", scrollToHash);
    return () => {
      window.removeEventListener("hashchange", scrollToHash);
      window.removeEventListener("popstate", scrollToHash);
    };
  }, [reduceMotion]);
}

// Small helper component to mount in layout
export function HashDeepLinkHandler() {
  useHashDeepLink();
  return null;
}
