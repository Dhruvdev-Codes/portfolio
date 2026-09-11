"use client";

import { useState, useEffect } from "react";
import { Terminal, Activity } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { PROFILE_DATA } from "@/data/profile";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const [latency, setLatency] = useState(24);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Simulated live edge telemetry ping
    const interval = setInterval(() => {
      setLatency(Math.floor(18 + Math.random() * 12));
    }, 4000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/40"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Scholar Identity */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center font-mono font-bold text-emerald-400 group-hover:border-emerald-400 transition-colors">
            DU
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-semibold text-zinc-100 tracking-tight">
                {PROFILE_DATA.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono border border-zinc-700">
                M.Tech CSE
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono hidden sm:block">
              NSUT Delhi • Systems & Security
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
          <a href="#research" className="hover:text-emerald-400 transition-colors">
            {"// Research"}
          </a>
          <a href="#systems" className="hover:text-emerald-400 transition-colors">
            {"// Systems & Projects"}
          </a>
          <a href="#simulator" className="hover:text-emerald-400 transition-colors">
            {"// Edge Lab"}
          </a>
          <a href="#skills" className="hover:text-emerald-400 transition-colors">
            {"// Skills"}
          </a>
          <a href="#certifications" className="hover:text-emerald-400 transition-colors">
            {"// Credentials"}
          </a>
        </nav>

        {/* Telemetry & Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Edge Latency Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-400">
            <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Edge: ap-south-1</span>
            <span className="text-emerald-400 font-semibold">{latency}ms</span>
          </div>

          {/* Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-emerald-500 transition-all text-xs font-mono group shadow-sm"
            title="Open AI Research Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-6 transition-transform" />
            <span className="hidden sm:inline">AI Terminal</span>
          </button>

          {/* GitHub Link */}
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

