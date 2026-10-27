"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import MascotPortfolioHero from "@/components/ui/mascot-portfolio-hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ResearchSection } from "@/components/ResearchSection";
import { EdgeAIShowcase } from "@/components/EdgeAIShowcase";
import { SkillsMatrix } from "@/components/SkillsMatrix";
import { CertificationsSection } from "@/components/CertificationsSection";
import { ContactSection } from "@/components/ContactSection";
import { AIChatDrawer } from "@/components/AIChatDrawer";
import { ResumeModal } from "@/components/ResumeModal";
import { NetworkBackground } from "@/components/NetworkBackground";
import { Footer } from "@/components/Footer";


export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showSections, setShowSections] = useState(false);

  const handleNavigate = () => {
    setShowSections(true);
  };

  return (
    <div className="relative min-h-screen bg-[#ebebea] text-[#111111] selection:bg-[#b98158]/30 selection:text-[#111111] antialiased overflow-x-hidden transition-colors duration-200 font-sans">
      {/* Dynamic Animated Wireless Mesh & Ambient Background */}
      <NetworkBackground />

      {/* Top Navigation */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <MascotPortfolioHero
          height="100svh"
          reel={["MTECH (INFORMATION SECURITY)", "NETAJI SUBHASH UNIVERSITY OF TECHNOLOGY"]}
          onExploreClick={handleNavigate}
        />
        {showSections && (
          <>
            <ProjectsSection />
            <ResearchSection />
            <EdgeAIShowcase />
            <SkillsMatrix />
            <CertificationsSection />
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />


      {/* Interactive Academic CV / Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* AI Chat Drawer */}
      <AIChatDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}








