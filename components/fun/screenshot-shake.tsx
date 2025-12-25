"use client";

import { useToast } from "@/components/ui/toast";
import { Camera } from "lucide-react";
import { isFunEnabled } from "@/config/funFlags";

export function ScreenshotShake() {
  const { showToast } = useToast();

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

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed top-1/2 right-4 w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 z-30"
        aria-label="Fake screenshot"
        title="Take screenshot?"
      >
        <Camera className="w-5 h-5" />
      </button>

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
