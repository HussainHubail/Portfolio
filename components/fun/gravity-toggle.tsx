"use client";

import { useEffect, useState } from "react";
import { isFunEnabled } from "@/config/funFlags";

const icons = ["⭐", "✨", "💫", "🌟", "⚡"];

export function GravityToggle() {
  const [gravity, setGravity] = useState(false);
  const [fallingIcons, setFallingIcons] = useState<{ id: number; icon: string; left: number }[]>([]);

  useEffect(() => {
    if (!gravity || !isFunEnabled('gravityToggle')) {
      setFallingIcons([]);
      return;
    }

    // Create a few falling icons
    const newIcons = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      left: Math.random() * 90 + 5, // 5-95%
    }));
    
    setFallingIcons(newIcons);
  }, [gravity]);

  if (!isFunEnabled('gravityToggle')) return null;

  return (
    <>
      {/* Falling icons */}
      {fallingIcons.map((item) => (
        <div
          key={item.id}
          className="fixed pointer-events-none text-2xl z-0 animate-fall"
          style={{
            left: `${item.left}%`,
            top: "-40px",
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          {item.icon}
        </div>
      ))}

      {/* Toggle button in footer */}
      <button
        onClick={() => setGravity(!gravity)}
        className="text-xs px-3 py-1 rounded-md border border-border hover:bg-accent transition-colors"
        aria-label={`Gravity: ${gravity ? "On" : "Off"}`}
      >
        Gravity: {gravity ? "ON" : "OFF"}
      </button>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(calc(100vh + 40px)) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </>
  );
}
