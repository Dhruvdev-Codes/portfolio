"use client";

import { useState, useEffect } from "react";
import { Activity, Mail, Sparkles, Menu, X } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PROFILE_DATA } from "@/data/profile";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const [latency, setLatency] = useState(22);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { href: "#about", label: "// About Me" },
    { href: "#projects", label: "// Projects" },
    { href: "#research", label: "// Research" },
    { href: "#simulations", label: "// Simulations" },
    { href: "#skills", label: "// Skills" },
    { href: "#credentials", label: "// Credentials" },
    { href: "#contact", label: "// Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled || mobileMenuOpen
          ? "bg-white/90 dark:bg-[#12161f]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#1e2738] shadow-md dark:shadow-black/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Scholar Identity */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-600 dark:text-cyan-400 group-hover:border-cyan-500 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
            DU
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                {PROFILE_DATA.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#1a2233] text-cyan-600 dark:text-cyan-400 font-mono border border-slate-200 dark:border-cyan-500/30">
                M.Tech CSE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono hidden sm:block">
              NSUT Delhi • Systems & Security
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-600 dark:text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Theme Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Edge Latency Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#182030] border border-slate-200 dark:border-[#222e44] text-[11px] font-mono text-slate-600 dark:text-slate-400">
            <Activity className="w-3 h-3 text-teal-500 dark:text-teal-400 animate-pulse" />
            <span>Edge</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{latency}ms</span>
          </div>

          {/* Single Icon Theme Toggle */}
          <ThemeToggle />

          {/* AI Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/50 dark:hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 hover:border-cyan-500 transition-all text-xs font-mono group shadow-sm cursor-pointer"
            title="Open AI Research Terminal"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">AI Agent</span>
          </button>

          {/* Email Quick Link */}
          <a
            href={`mailto:${PROFILE_DATA.email}`}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#182030] dark:hover:bg-[#1f2a3e] border border-slate-200 dark:border-[#222e44] hover:border-cyan-500/50 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            title="Direct Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* GitHub Link */}
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#182030] dark:hover:bg-[#1f2a3e] border border-slate-200 dark:border-[#222e44] hover:border-cyan-500/50 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#182030] dark:hover:bg-[#1f2a3e] border border-slate-200 dark:border-[#222e44] hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 dark:bg-[#12161f]/98 border-b border-slate-200 dark:border-[#222e44] px-4 py-5 font-mono shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-[#161d2b] border border-slate-200 dark:border-[#222e44] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-cyan-500/40 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-mono text-[10px]">→</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-[#1e2738] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Theme:</span>
              <ThemeToggle />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-teal-500 dark:text-teal-400 animate-pulse" />
                <span>Latency: <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{latency}ms</span></span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 text-xs font-semibold cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch AI Agent</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}



