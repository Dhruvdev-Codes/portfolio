"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`p-2 rounded-lg bg-slate-100 dark:bg-[#182030] border border-slate-200 dark:border-[#222e44] text-slate-700 dark:text-slate-300 ${className}`}
        disabled
      >
        <Moon className="w-4 h-4 text-cyan-500 opacity-50" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#182030] dark:hover:bg-[#1f2a3e] border border-slate-200 dark:border-[#222e44] hover:border-cyan-500/50 dark:hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 cursor-pointer shadow-sm flex items-center justify-center group ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Moon className="w-4 h-4 text-cyan-400 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
      ) : (
        <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300" />
      )}
    </button>
  );
}
