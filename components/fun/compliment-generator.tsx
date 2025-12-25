"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { isFunEnabled } from "@/config/funFlags";

const compliments = [
  "Clean UI detected. ✨",
  "Pixels approved. 👌",
  "Ship it energy. 🚀",
  "Typography on point. 📐",
  "Smooth scrolling confirmed. 🎯",
  "Color scheme vibes. 🎨",
  "Layout goals. 📱",
  "Performance unlocked. ⚡",
  "Mobile-friendly certified. 📲",
  "Dark mode respect. 🌙",
  "Accessibility wins. ♿",
  "Code quality detected. 💻",
];

export function ComplimentGenerator() {
  const [compliment, setCompliment] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = () => {
    if (!isFunEnabled('complimentGenerator')) return;
    
    const random = compliments[Math.floor(Math.random() * compliments.length)];
    setCompliment(random);
    setShow(true);
    setTimeout(() => setShow(false), 3000);
  };

  if (!isFunEnabled('complimentGenerator')) return null;

  return (
    <>
      {show && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-xl text-sm font-medium">
            {compliment}
          </div>
        </div>
      )}
      
      <button
        onClick={handleClick}
        className="text-xs px-3 py-1 rounded-md border border-border hover:bg-accent transition-colors inline-flex items-center gap-1"
        aria-label="Get a compliment"
      >
        <Sparkles className="w-3 h-3" />
        Make it cooler
      </button>
    </>
  );
}
