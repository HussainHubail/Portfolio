"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/toast";
import { features } from "@/config/features";

const SEQ = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function isTypingTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName?.toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    el.isContentEditable
  );
}

export function KonamiMode() {
  const { showToast } = useToast();
  const idx = useRef(0);

  useEffect(() => {
    if (!features.konamiMode) return;

    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = SEQ[idx.current];
      if (key === expected) {
        idx.current += 1;
        if (idx.current === SEQ.length) {
          idx.current = 0;
          showToast("Konami mode activated!", "success");
          // Optional: add a temporary class for subtle accent shift
          document.documentElement.classList.add("konami-mode");
          setTimeout(() => {
            document.documentElement.classList.remove("konami-mode");
          }, 4000);
        }
      } else {
        idx.current = 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showToast]);

  return null;
}
