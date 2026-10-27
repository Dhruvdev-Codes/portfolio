"use client";

import { useState, useEffect } from "react";
import { Activity, Mail, Sparkles, Menu, X, FileText } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

import { PROFILE_DATA } from "@/data/profile";

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenResume?: () => void;
  onNavigate?: () => void;
}

export function Navbar({ onOpenTerminal, onOpenResume, onNavigate }: NavbarProps) {
  const [latency, setLatency] = useState(22);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(16 + Math.random() * 10));
    }, 4000);
    return () => clearInterval(interval);
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
    <header className="sticky top-0 left-0 w-full z-50 bg-[#ebebea] border-b border-[#111111]/15 px-6 py-3 flex items-center justify-between shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Scholar Identity */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-[#111111] text-[#ebebea] border border-[#111111] flex items-center justify-center font-mono font-bold group-hover:bg-[#b98158] transition-all">
            DU
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-[#111111] tracking-tight group-hover:text-[#b98158] transition-colors">
                {PROFILE_DATA.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#111111]/5 text-[#111111] font-mono border border-[#111111]/20">
                M.Tech CSE
              </span>
            </div>
            <p className="text-[11px] text-[#555555] font-mono hidden sm:block">
              NSUT Delhi • Systems & Security
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-[#111111]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className="hover:text-[#b98158] transition-colors py-1 font-medium cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Edge Latency Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#111111]/5 border border-[#111111]/20 text-[11px] font-mono text-[#111111]">
            <Activity className="w-3 h-3 text-[#b98158] animate-pulse" />
            <span>Edge</span>
            <span className="text-[#111111] font-bold">{latency}ms</span>
          </div>

          {/* CV / Resume Modal Launcher */}
          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] text-[#ebebea] hover:bg-[#b98158] text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
              title="Open Academic CV &amp; Resume"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">CV / Resume</span>
              <span className="sm:hidden">CV</span>
            </button>
          )}

          {/* AI Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] text-[#ebebea] hover:bg-[#b98158] text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
            title="Launch Dhruv AI Agent"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b98158]" />
            <span className="hidden sm:inline">AI Agent</span>
          </button>

          {/* Email Quick Link */}
          <a
            href={`mailto:${PROFILE_DATA.email}`}
            className="p-2 rounded-lg bg-[#fdfbf7] border border-[#111111]/20 text-[#111111] hover:bg-[#111111] hover:text-[#ebebea] transition-colors"
            title="Direct Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          {/* GitHub Link */}
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#fdfbf7] border border-[#111111]/20 text-[#111111] hover:bg-[#111111] hover:text-[#ebebea] transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#fdfbf7] border border-[#111111]/20 text-[#111111] hover:bg-[#111111] hover:text-[#ebebea] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fdfbf7] border-b border-[#111111]/20 px-4 py-5 font-mono shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 text-[#111111]">
          <div className="flex flex-col space-y-2 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate?.();
                }}
                className="px-3 py-2.5 rounded-lg bg-[#ebebea] border border-[#111111]/20 text-xs font-semibold text-[#111111] hover:text-[#b98158] hover:border-[#111111]/40 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[#b98158] font-mono text-[10px]">→</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#111111]/20 space-y-3">
            {onOpenResume && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-[#111111] text-[#ebebea] hover:bg-[#b98158] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Full CV / Resume</span>
              </button>
            )}

            <div className="flex items-center justify-between text-xs text-[#555555] pt-1">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#b98158] animate-pulse" />
                <span>Latency: <span className="text-[#111111] font-bold">{latency}ms</span></span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex items-center gap-1.5 text-[#111111] hover:text-[#b98158] text-xs font-bold cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#b98158]" />
                <span>Launch AI Agent</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}



