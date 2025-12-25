"use client";

import { useEffect, useState } from "react";
import { isFunEnabled } from "@/config/funFlags";

export function RetroCRT() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("retro-crt");
    if (saved === "true" && isFunEnabled('retroCRT')) {
      setEnabled(true);
      document.documentElement.classList.add("retro-crt");
    }
  }, []);

  const toggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    localStorage.setItem("retro-crt", String(newState));
    
    if (newState) {
      document.documentElement.classList.add("retro-crt");
    } else {
      document.documentElement.classList.remove("retro-crt");
    }
  };

  if (!isFunEnabled('retroCRT')) return null;

  return (
    <button
      onClick={toggle}
      className="text-xs px-3 py-1 rounded-md border border-border hover:bg-accent transition-colors"
      aria-label={`Retro CRT: ${enabled ? "On" : "Off"}`}
    >
      📺 CRT: {enabled ? "ON" : "OFF"}
    </button>
  );
}
