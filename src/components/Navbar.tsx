"use client";

import { useState, useEffect } from "react";
import { Activity, Mail, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { PROFILE_DATA } from "@/data/profile";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const [latency, setLatency] = useState(22);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(16 + Math.random() * 10));
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
          ? "bg-[#12161f]/90 backdrop-blur-md border-b border-[#1e2738] shadow-lg shadow-black/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Scholar Identity */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
            DU
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-slate-100 tracking-tight group-hover:text-cyan-300 transition-colors">
                {PROFILE_DATA.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a2233] text-cyan-400 font-mono border border-cyan-500/30">
                M.Tech CSE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              NSUT Delhi • Systems & Security
            </p>
          </div>
        </a>

        {/* Navigation Links with Smooth Section Anchors */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400">
          <a href="#about" className="hover:text-cyan-400 transition-colors">
            {"// About Me"}
          </a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">
            {"// Projects"}
          </a>
          <a href="#research" className="hover:text-cyan-400 transition-colors">
            {"// Research"}
          </a>
          <a href="#simulations" className="hover:text-cyan-400 transition-colors">
            {"// Simulations"}
          </a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">
            {"// Skills"}
          </a>
          <a href="#credentials" className="hover:text-cyan-400 transition-colors">
            {"// Credentials"}
          </a>
        </nav>

        {/* Action Buttons & Social Icons */}
        <div className="flex items-center gap-2.5">
          {/* Edge Latency Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#182030] border border-[#222e44] text-[11px] font-mono text-slate-400">
            <Activity className="w-3 h-3 text-teal-400 animate-pulse" />
            <span>Edge</span>
            <span className="text-cyan-400 font-semibold">{latency}ms</span>
          </div>

          {/* AI Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 transition-all text-xs font-mono group shadow-sm cursor-pointer"
            title="Open AI Research Terminal"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">AI Agent</span>
          </button>

          {/* Email Quick Link */}
          <a
            href={`mailto:${PROFILE_DATA.email}`}
            className="p-2 rounded-lg bg-[#182030] border border-[#222e44] hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-colors"
            title="Direct Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* GitHub Link */}
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#182030] border border-[#222e44] hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}


