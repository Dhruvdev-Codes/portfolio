"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ResearchSection } from "@/components/ResearchSection";
import { EdgeAIShowcase } from "@/components/EdgeAIShowcase";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { CertificationsSection } from "@/components/CertificationsSection";
import { AIChatDrawer } from "@/components/AIChatDrawer";
import { NetworkBackground } from "@/components/NetworkBackground";
import { Footer } from "@/components/Footer";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#12161f] text-slate-900 dark:text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-700 dark:selection:text-cyan-300 antialiased overflow-x-hidden transition-colors duration-200">
      {/* Dynamic Animated Wireless Mesh & Ambient Background */}
      <NetworkBackground />

      {/* Top Navigation */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <ProjectsSection />
        <ResearchSection />
        <EdgeAIShowcase />
        <SkillsMatrix />
        <CertificationsSection />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Floating AI Terminal Button */}
      {!isTerminalOpen && (
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center gap-2 sm:gap-2.5 bg-white/95 dark:bg-[#151c2a]/95 hover:bg-slate-100 dark:hover:bg-[#1b2436] text-slate-900 dark:text-white border border-slate-200 dark:border-[#222e44] hover:border-cyan-500/60 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-lg dark:shadow-2xl backdrop-blur-md transition-all font-mono text-xs group cursor-pointer active:scale-95"
          aria-label="Open Dhruv AI Research Agent"
        >
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold hidden sm:inline">Ask Dhruv&apos;s AI Agent</span>
          <span className="font-semibold sm:hidden">Ask AI Agent</span>
          <span className="w-2 h-2 rounded-full bg-cyan-600 dark:bg-cyan-400 animate-pulse" />
        </button>
      )}

      {/* AI Chat Drawer */}
      <AIChatDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}





