"use client";

import { useToast } from "@/components/ui/toast";
import { Camera, X } from "lucide-react";
import { isFunEnabled } from "@/config/funFlags";
import { useState, useRef } from "react";

export function ScreenshotShake() {
  const { showToast } = useToast();
  const [visible, setVisible] = useState(true);
  const longPressRef = useRef<NodeJS.Timeout | null>(null);

  const handleLongPress = () => {
    setVisible(false);
  };

  const handleMouseDown = () => {
    longPressRef.current = setTimeout(() => {
      handleLongPress();
    }, 200);
  };

  const handleMouseUp = () => {
    if (longPressRef.current) clearTimeout(longPressRef.current);
  };

  const handleClick = () => {
    if (!isFunEnabled('screenshotShake')) return;

    // Flash effect
    const flash = document.createElement("div");
    flash.style.position = "fixed";
    flash.style.inset = "0";
    flash.style.background = "white";
    flash.style.zIndex = "99999";
    flash.style.pointerEvents = "none";
    flash.style.animation = "flash 300ms ease-out";
    document.body.appendChild(flash);

    // Shake effect
    document.body.style.animation = "shake 150ms ease-in-out";

    setTimeout(() => {
      flash.remove();
      document.body.style.animation = "";
      showToast("📸 Screenshot saved! (not really)", "success");
    }, 300);
  };

  if (!isFunEnabled('screenshotShake')) return null;

  if (!visible) return null;

  return (
    <>
      <div className="fixed top-1/2 right-4 -translate-y-1/2 z-20 flex items-center gap-2 group pointer-events-none">
        <button
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 pointer-events-auto"
          aria-label="Fake screenshot"
          title="Take screenshot? Long-press to hide."
        >
          <Camera className="w-5 h-5" />
        </button>
        <button
          onClick={() => setVisible(false)}
          className="w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
          aria-label="Dismiss screenshot button"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      <style jsx global>{`
        @keyframes flash {
          0% { opacity: 0; }
          50% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
      `}</style>
    </>
  );
}
