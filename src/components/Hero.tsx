"use client";

import { Layers, BookOpen, Mail, Shield, Sparkles, FileText } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { PROFILE_DATA } from "@/data/profile";

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResume?: () => void;
}

export function Hero({ onOpenTerminal, onOpenResume }: HeroProps) {
  return (
    <section id="about" className="relative pt-32 pb-16 md:pt-38 md:pb-20 overflow-hidden">
      {/* Background Accent Glows (Teal / Cyan) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[450px] h-[280px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#182030] border border-slate-200 dark:border-cyan-500/30 text-xs font-mono text-slate-700 dark:text-slate-300 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-ping" />
            <span className="text-slate-500 dark:text-slate-400">Scholar:</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{PROFILE_DATA.institution}</span>
          </div>

          {/* Clean, Large Bold Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight font-sans">
            {PROFILE_DATA.name}
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 dark:from-cyan-400 dark:via-teal-300 dark:to-sky-400 mb-6 tracking-tight font-sans">
            Software Developer | Cyber Security Engineer
          </h2>

          {/* Specialty Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-[#161d2b] border border-slate-200 dark:border-[#222e44] text-slate-700 dark:text-slate-300 shadow-sm">
              Ad-Hoc Wireless Link Predictability
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-[#161d2b] border border-slate-200 dark:border-[#222e44] text-slate-700 dark:text-slate-300 shadow-sm">
              Distributed Cloud Architecture
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white dark:bg-[#161d2b] border border-slate-200 dark:border-[#222e44] text-slate-700 dark:text-slate-300 shadow-sm">
              AEAD Network Cryptography
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 font-mono text-xs sm:text-sm">
            <a
              href="#projects"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-500 dark:to-teal-500 hover:from-cyan-500 hover:to-teal-500 text-white dark:text-slate-950 font-bold transition-all shadow-md shadow-cyan-900/20 hover:shadow-cyan-900/40 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Explore Projects</span>
            </a>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-[#182030] hover:bg-slate-100 dark:hover:bg-[#1e273a] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#26354d] hover:border-cyan-500/60 transition-all shadow-sm cursor-pointer"
              >
                <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>View CV / Resume</span>
              </button>
            )}

            <a
              href="#research"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-[#182030] hover:bg-slate-100 dark:hover:bg-[#1e273a] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#26354d] hover:border-cyan-500/60 transition-all shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Research Framework</span>
            </a>

            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-[#182030] hover:bg-slate-100 dark:hover:bg-[#1e273a] text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer group shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Ask AI Agent</span>
            </button>
          </div>

          {/* Social & Contact Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-10 text-xs font-mono text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-[#1e2738]/60">
            <span className="text-slate-400 dark:text-slate-500">Connect:</span>
            <a
              href={PROFILE_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>GitHub</span>
            </a>
            <a
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Shield className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PROFILE_DATA.email}`}
              className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>{PROFILE_DATA.email}</span>
            </a>
          </div>

          {/* Metrics Display */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            {PROFILE_DATA.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-white/90 dark:bg-[#161d2b]/80 border border-slate-200 dark:border-[#222e44] backdrop-blur-sm hover:border-cyan-500/40 transition-colors shadow-sm"
              >
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">{metric.label}</div>
                <div className="text-sm font-bold text-cyan-700 dark:text-cyan-300 truncate">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

