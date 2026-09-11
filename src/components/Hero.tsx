"use client";

import { Terminal, BookOpen, Layers } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

interface HeroProps {
  onOpenTerminal: () => void;
}

export function Hero({ onOpenTerminal }: HeroProps) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Accent Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[400px] h-[250px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-zinc-400">Status:</span>
            <span className="text-emerald-400 font-medium">M.Tech CSE Scholar @ NSUT Delhi</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 hidden sm:inline">2026PIS7730</span>
          </div>

          {/* Main Title & Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 mb-6 leading-tight">
            Engineering Resilient Network Systems,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Ad-Hoc Protocols
            </span>{" "}
            & Scalable Software.
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed mb-8 max-w-3xl font-sans">
            I am <strong className="text-zinc-200">{PROFILE_DATA.name}</strong>, an M.Tech CSE student specializing in{" "}
            <span className="text-zinc-200 font-medium">Information & Network Security</span> at Netaji Subhas University of Technology (NSUT), New Delhi. My research centers on proactive link predictability for ad-hoc wireless routing (MANET/VANET) through kinematic modeling, RSSI signal filtering, and lightweight AEAD authentication.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12 font-mono text-xs sm:text-sm">
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all shadow-lg shadow-emerald-950/40 hover:shadow-emerald-900/60 cursor-pointer"
            >
              <Terminal className="w-4 h-4" />
              <span>Query AI Research Terminal</span>
            </button>

            <a
              href="#research"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-zinc-600 transition-all"
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Read Dissertation</span>
            </a>

            <a
              href="#systems"
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 hover:border-zinc-700 transition-all"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Systems & Projects</span>
            </a>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            {PROFILE_DATA.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm"
              >
                <div className="text-[11px] text-zinc-500 mb-1">{metric.label}</div>
                <div className="text-sm font-semibold text-zinc-200 truncate">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
