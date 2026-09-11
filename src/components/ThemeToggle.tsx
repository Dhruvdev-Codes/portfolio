"use client";

import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Laptop, Check } from "lucide-react";
import { useTheme, Theme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  variant?: "dropdown" | "segmented" | "cycle";
}

export function ThemeToggle({ className = "", variant = "segmented" }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Laptop },
  ];

  // 1. 3-Segment Pill Switcher (Light | Dark | System)
  if (variant === "segmented") {
    return (
      <div
        role="group"
        aria-label="Theme selector"
        className={`inline-flex items-center p-0.5 sm:p-1 rounded-lg bg-slate-200/90 dark:bg-[#151c2a] border border-slate-300/80 dark:border-[#222e44] shadow-inner ${className}`}
      >
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = mounted ? theme === opt.value : opt.value === "system";
          return (
            <button
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                isActive
                  ? "bg-white dark:bg-[#1f2a3e] text-cyan-600 dark:text-cyan-400 font-bold shadow-sm border border-slate-200 dark:border-cyan-500/40"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
              title={`Switch to ${opt.label} theme`}
              aria-label={`Switch to ${opt.label} theme`}
              aria-pressed={isActive}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // 2. Cycle button: cycles Light -> Dark -> System on click
  if (variant === "cycle") {
    const handleCycle = () => {
      if (theme === "light") setTheme("dark");
      else if (theme === "dark") setTheme("system");
      else setTheme("light");
    };

    const CurrentIcon = !mounted
      ? Moon
      : theme === "system"
      ? Laptop
      : resolvedTheme === "dark"
      ? Moon
      : Sun;

    const label = !mounted ? "Theme" : theme.charAt(0).toUpperCase() + theme.slice(1);

    return (
      <button
        onClick={handleCycle}
        className={`p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#182030] dark:hover:bg-[#1f2a3e] border border-slate-200 dark:border-[#222e44] hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm text-xs font-mono ${className}`}
        title={`Theme: ${label} (Click to cycle)`}
        aria-label={`Theme: ${label}`}
      >
        <CurrentIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
        <span className="hidden sm:inline text-[11px] font-semibold">{label}</span>
      </button>
    );
  }

  // 3. Compact Dropdown Menu
  const CurrentIcon = !mounted
    ? Moon
    : theme === "system"
    ? Laptop
    : resolvedTheme === "dark"
    ? Moon
    : Sun;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#182030] dark:hover:bg-[#1f2a3e] border border-slate-200 dark:border-[#222e44] hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all flex items-center justify-center cursor-pointer shadow-sm"
        title={`Theme: ${mounted ? theme.charAt(0).toUpperCase() + theme.slice(1) : "System"}`}
        aria-label="Toggle theme dropdown"
        aria-expanded={isOpen}
      >
        <CurrentIcon className="w-4 h-4 transition-transform hover:scale-110 text-cyan-600 dark:text-cyan-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 py-1.5 rounded-xl bg-white dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44] shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150 font-mono text-xs">
          <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-[#1e2738] mb-1">
            Appearance
          </div>
          {options.map((opt) => {
            const Icon = opt.icon;
            const isActive = mounted && theme === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setTheme(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 transition-colors cursor-pointer text-left ${
                  isActive
                    ? "text-cyan-600 dark:text-cyan-400 font-semibold bg-cyan-50 dark:bg-cyan-950/40"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1a2334] hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5" />
                  <span>{opt.label}</span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
