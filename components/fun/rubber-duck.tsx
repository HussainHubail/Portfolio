"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { isFunEnabled } from "@/config/funFlags";

const duckQuips = [
  "🦆 Quack!",
  "Looking good!",
  "Clean code detected.",
  "Ship it!",
  "Rubber duck approved.",
  "Debug mode: ON",
  "Nice portfolio!",
  "Keep swimming.",
];

export function RubberDuck() {
  const [visible, setVisible] = useState(false);
  const [quipIndex, setQuipIndex] = useState(0);
  const [showQuip, setShowQuip] = useState(false);

  useEffect(() => {
    if (!isFunEnabled('rubberDuck')) return;
    
    const dismissed = localStorage.getItem("rubber-duck-dismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem("rubber-duck-dismissed", "true");
  };

  const handleClick = () => {
    setQuipIndex((prev) => (prev + 1) % duckQuips.length);
    setShowQuip(true);
    setTimeout(() => setShowQuip(false), 2000);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2">
      {/* Quip bubble */}
      {showQuip && (
        <div className="animate-in slide-in-from-bottom-2 fade-in duration-200 bg-background border border-border rounded-lg px-3 py-2 shadow-lg text-sm max-w-[200px]">
          {duckQuips[quipIndex]}
        </div>
      )}
      
      {/* Duck button */}
      <div className="relative group">
        <button
          onClick={handleClick}
          className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-all shadow-lg flex items-center justify-center text-2xl hover:scale-110 active:scale-95"
          aria-label="Rubber duck companion"
          title="Click for encouragement!"
        >
          🦆
        </button>
        
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Dismiss duck"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
