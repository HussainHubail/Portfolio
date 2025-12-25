"use client";

import { useState, useEffect } from "react";
import { Sparkles, SparklesIcon } from "lucide-react";
import { funFlags } from "@/config/funFlags";

export function FunModeToggle() {
  const [enabled, setEnabled] = useState(funFlags.masterToggle);

  useEffect(() => {
    const saved = localStorage.getItem("fun-mode");
    if (saved !== null) {
      const isEnabled = saved === "true";
      setEnabled(isEnabled);
      funFlags.masterToggle = isEnabled;
    }
  }, []);

  const toggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    funFlags.masterToggle = newState;
    localStorage.setItem("fun-mode", String(newState));
    
    // Force reload to apply/remove all fun features
    window.location.reload();
  };

  return (
    <button
      onClick={toggle}
      className={`text-xs px-3 py-1 rounded-md border transition-colors inline-flex items-center gap-1 ${
        enabled
          ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
          : "border-border hover:bg-accent"
      }`}
      aria-label={`Fun Mode: ${enabled ? "On" : "Off"}`}
    >
      <Sparkles className="w-3 h-3" />
      Fun Mode: {enabled ? "ON" : "OFF"}
    </button>
  );
}
