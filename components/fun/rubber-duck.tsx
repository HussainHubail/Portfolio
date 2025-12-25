"use client";

import { useEffect, useState, useRef } from "react";
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
  const longPressRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isFunEnabled('rubberDuck')) return;
    
    const dismissed = localStorage.getItem("rubber-duck-dismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleLongPress = () => {
    setVisible(false);
    localStorage.setItem("rubber-duck-dismissed", "true");
  };

  const handleMouseDown = () => {
    longPressRef.current = setTimeout(() => {
      handleLongPress();
    }, 200);
  };

  const handleMouseUp = () => {
    if (longPressRef.current) clearTimeout(longPressRef.current);
  };

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
    <div className="fixed bottom-20 right-4 z-20 flex flex-col items-end gap-2 pointer-events-none">
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
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="w-14 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-all shadow-lg flex items-center justify-center text-2xl hover:scale-110 active:scale-95 pointer-events-auto"
          aria-label="Rubber duck companion"
          title="Click for encouragement! Long-press to hide."
        >
          🦆
        </button>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
          aria-label="Dismiss duck"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
