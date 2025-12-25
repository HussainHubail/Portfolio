"use client";

import { useEffect, useState } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { isFunEnabled } from "@/config/funFlags";
import { X } from "lucide-react";

const expressions = {
  default: "👀",
  peek: "👁️",
  happy: "😊",
  wave: "👋",
  love: "💙",
  sleep: "😴",
};

export function TinyPet() {
  const [visible, setVisible] = useState(false);
  const [expression, setExpression] = useState<keyof typeof expressions>("default");
  const scrollY = useScrollPosition();

  useEffect(() => {
    if (!isFunEnabled('tinyPet')) return;
    
    const dismissed = localStorage.getItem("tiny-pet-dismissed");
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  // Change expression based on scroll position
  useEffect(() => {
    if (scrollY === 0) {
      setExpression("default");
    } else if (scrollY > 500) {
      setExpression("sleep");
    } else {
      setExpression("peek");
    }
  }, [scrollY]);

  const handleClick = () => {
    const exprs = Object.keys(expressions) as (keyof typeof expressions)[];
    const randomExpr = exprs[Math.floor(Math.random() * exprs.length)];
    setExpression(randomExpr);
    setTimeout(() => setExpression("default"), 2000);
  };

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem("tiny-pet-dismissed", "true");
  };

  if (!visible) return null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 flex items-center gap-2 group">
      <button
        onClick={handleClick}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg flex items-center justify-center text-2xl hover:scale-110 active:scale-95"
        aria-label="Tiny pet companion"
        title="Click me!"
      >
        {expressions[expression]}
      </button>
      
      <button
        onClick={handleDismiss}
        className="w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Dismiss pet"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
