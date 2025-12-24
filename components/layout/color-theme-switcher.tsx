"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const colorThemes = [
  { name: "Blue", value: "blue", color: "240 5.9% 10%" },
  { name: "Green", value: "green", color: "142 76% 36%" },
  { name: "Purple", value: "purple", color: "271 81% 56%" },
  { name: "Orange", value: "orange", color: "25 95% 53%" },
];

export function ColorThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("blue");

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("color-theme") || "blue";
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    const selectedTheme = colorThemes.find((t) => t.value === theme);
    
    if (!selectedTheme) return;

    // Apply color based on theme
    switch (theme) {
      case "blue":
        root.style.setProperty("--primary", "222.2 47.4% 11.2%");
        root.style.setProperty("--primary-foreground", "210 40% 98%");
        break;
      case "green":
        root.style.setProperty("--primary", "142 76% 36%");
        root.style.setProperty("--primary-foreground", "138 76% 97%");
        break;
      case "purple":
        root.style.setProperty("--primary", "271 81% 56%");
        root.style.setProperty("--primary-foreground", "271 91% 99%");
        break;
      case "orange":
        root.style.setProperty("--primary", "25 95% 53%");
        root.style.setProperty("--primary-foreground", "26 83% 98%");
        break;
    }
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem("color-theme", theme);
    applyTheme(theme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-border hover:bg-accent transition-colors text-sm"
        aria-label="Change theme color"
      >
        <div className="w-4 h-4 rounded-full border-2 border-current" 
          style={{ 
            backgroundColor: colorThemes.find(t => t.value === currentTheme)?.value === "blue" 
              ? "hsl(222.2 47.4% 11.2%)" 
              : colorThemes.find(t => t.value === currentTheme)?.value === "green"
              ? "hsl(142 76% 36%)"
              : colorThemes.find(t => t.value === currentTheme)?.value === "purple"
              ? "hsl(271 81% 56%)"
              : "hsl(25 95% 53%)"
          }} 
        />
        <span className="hidden sm:inline">Color</span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <div className="p-2 space-y-1">
          {colorThemes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => handleThemeChange(theme.value)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-accent ${
                currentTheme === theme.value ? "bg-accent" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full border border-border"
                  style={{
                    backgroundColor:
                      theme.value === "blue"
                        ? "hsl(222.2 47.4% 11.2%)"
                        : theme.value === "green"
                        ? "hsl(142 76% 36%)"
                        : theme.value === "purple"
                        ? "hsl(271 81% 56%)"
                        : "hsl(25 95% 53%)",
                  }}
                />
                <span className="text-sm">{theme.name}</span>
              </div>
              {currentTheme === theme.value && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
