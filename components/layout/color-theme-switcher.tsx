"use client";

import { useEffect, useState, useRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const colorThemes = [
  { name: "Blue", value: "blue", primary: "222.2 47.4% 11.2%", foreground: "210 40% 98%" },
  { name: "Green", value: "green", primary: "142 76% 36%", foreground: "138 76% 97%" },
  { name: "Purple", value: "purple", primary: "271 81% 56%", foreground: "271 91% 99%" },
  { name: "Orange", value: "orange", primary: "25 95% 53%", foreground: "26 83% 98%" },
  { name: "Red", value: "red", primary: "0 72% 51%", foreground: "0 85% 97%" },
  { name: "Pink", value: "pink", primary: "330 81% 60%", foreground: "330 85% 97%" },
  { name: "Teal", value: "teal", primary: "180 83% 37%", foreground: "180 80% 97%" },
  { name: "Indigo", value: "indigo", primary: "239 84% 67%", foreground: "239 85% 97%" },
];

export function ColorThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("blue");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("color-theme") || "blue";
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside as any);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside as any);
    };
  }, [isOpen]);

  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    const selectedTheme = colorThemes.find((t) => t.value === theme);
    
    if (!selectedTheme) return;

    root.style.setProperty("--primary", selectedTheme.primary);
    root.style.setProperty("--primary-foreground", selectedTheme.foreground);
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem("color-theme", theme);
    applyTheme(theme);
    setIsOpen(false);
  };

  const getCurrentColor = () => {
    const theme = colorThemes.find(t => t.value === currentTheme);
    return theme ? `hsl(${theme.primary})` : "hsl(222.2 47.4% 11.2%)";
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-border hover:bg-accent transition-colors text-sm"
        aria-label="Change theme color"
        aria-expanded={isOpen}
      >
        <div 
          className="w-4 h-4 rounded-full border-2 border-current" 
          style={{ backgroundColor: getCurrentColor() }} 
        />
        <span className="hidden sm:inline">Color</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2 space-y-1 max-h-[300px] overflow-y-auto">
            {colorThemes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => handleThemeChange(theme.value)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors hover:bg-accent",
                  currentTheme === theme.value ? "bg-accent" : ""
                )}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: `hsl(${theme.primary})` }}
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
      )}
    </div>
  );
}
