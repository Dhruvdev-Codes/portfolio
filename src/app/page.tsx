"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ResearchSection } from "@/components/ResearchSection";
import { ProjectsSection } from "@/components/ProjectsSection";
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
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-300 antialiased overflow-x-hidden">
      {/* Dynamic Animated Wireless Mesh & Ambient Background */}
      <NetworkBackground />

      {/* Top Navigation */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <ResearchSection />
        <ProjectsSection />
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
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border border-zinc-700 hover:border-emerald-500 px-4 py-3 rounded-full shadow-2xl backdrop-blur-md transition-all font-mono text-xs group cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
          <span className="font-semibold">Ask Dhruv&apos;s AI Agent</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
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



