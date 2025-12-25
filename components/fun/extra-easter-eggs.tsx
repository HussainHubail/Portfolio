"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/toast";
import { isFunEnabled } from "@/config/funFlags";

const HELLO_SEQ = ["h", "e", "l", "l", "o"];
const DEBUG_SEQ = ["d", "e", "b", "u", "g"];

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

function confetti() {
  const emojis = ["🎉", "✨", "🎊", "⭐", "💫"];
  const count = 20;
  
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.position = "fixed";
    el.style.left = `${Math.random() * 100}%`;
    el.style.top = "-20px";
    el.style.fontSize = "24px";
    el.style.pointerEvents = "none";
    el.style.zIndex = "9999";
    el.style.animation = `fall ${2 + Math.random()}s linear forwards`;
    document.body.appendChild(el);
    
    setTimeout(() => el.remove(), 3000);
  }
}

export function ExtraEasterEggs() {
  const { showToast } = useToast();
  const helloIdx = useRef(0);
  const debugIdx = useRef(0);

  useEffect(() => {
    if (!isFunEnabled('easterEggs')) return;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      
      // Check HELLO sequence
      if (key === HELLO_SEQ[helloIdx.current]) {
        helloIdx.current += 1;
        if (helloIdx.current === HELLO_SEQ.length) {
          helloIdx.current = 0;
          showToast("👋 Hello there!", "success");
          confetti();
        }
      } else {
        helloIdx.current = 0;
      }

      // Check DEBUG sequence
      if (key === DEBUG_SEQ[debugIdx.current]) {
        debugIdx.current += 1;
        if (debugIdx.current === DEBUG_SEQ.length) {
          debugIdx.current = 0;
          showToast("🐛 Debug mode... just kidding!", "success");
          document.documentElement.style.border = "5px dashed lime";
          setTimeout(() => {
            document.documentElement.style.border = "";
          }, 2000);
        }
      } else {
        debugIdx.current = 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      style.remove();
    };
  }, [showToast]);

  return null;
}
