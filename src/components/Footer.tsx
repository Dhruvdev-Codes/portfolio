"use client";

import { Mail, MapPin, ArrowUp, Sparkles, Shield, FileText } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { PROFILE_DATA } from "@/data/profile";

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenResume?: () => void;
}

export function Footer({ onOpenTerminal, onOpenResume }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#111111]/15 bg-[#ebebea] py-12 font-mono text-xs text-[#555555]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#111111] text-sm">{PROFILE_DATA.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#fdfbf7] border border-[#111111]/20 text-[#111111] font-bold">
                Software Developer | Cyber Security Engineer
              </span>
            </div>
            <p className="text-[#555555] text-xs font-sans max-w-md leading-relaxed">
              M.Tech CSE Scholar specializing in Information & Network Security, Ad-Hoc Wireless Protocols, Distributed Systems, and Cloud Architecture at Netaji Subhas University of Technology (NSUT), New Delhi.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-1.5 text-xs text-[#111111] hover:text-[#b98158] transition-colors cursor-pointer font-bold"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#b98158]" />
                <span>Launch Interactive AI Terminal</span>
              </button>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="flex items-center gap-1.5 text-xs text-[#111111] hover:text-[#b98158] transition-colors cursor-pointer font-bold"
                >
                  <FileText className="w-3.5 h-3.5 text-[#b98158]" />
                  <span>View Full CV / Resume</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Direct Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#111111] text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5">
              <li><a href="#about" className="hover:text-[#111111] text-[#555555] transition-colors">00 // About Me</a></li>
              <li><a href="#projects" className="hover:text-[#111111] text-[#555555] transition-colors">01 // Projects</a></li>
              <li><a href="#research" className="hover:text-[#111111] text-[#555555] transition-colors">02 // Research Paper</a></li>
              <li><a href="#simulations" className="hover:text-[#111111] text-[#555555] transition-colors">03 // Simulation Lab</a></li>
              <li><a href="#skills" className="hover:text-[#111111] text-[#555555] transition-colors">04 // Skills Matrix</a></li>
              <li><a href="#credentials" className="hover:text-[#111111] text-[#555555] transition-colors">05 // Credentials</a></li>
              <li><a href="#contact" className="hover:text-[#111111] text-[#555555] transition-colors">06 // Contact Gateway</a></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#111111] text-xs uppercase tracking-wider">Direct Connect</h4>
            <div className="space-y-1.5 text-[11px]">
              <a href={`mailto:${PROFILE_DATA.email}`} className="flex items-center gap-2 text-[#555555] hover:text-[#111111] transition-colors truncate">
                <Mail className="w-3.5 h-3.5 text-[#b98158] shrink-0" />
                <span className="truncate">{PROFILE_DATA.email}</span>
              </a>
              <a href={`mailto:${PROFILE_DATA.academicEmail}`} className="flex items-center gap-2 text-[#555555] hover:text-[#111111] transition-colors truncate">
                <Mail className="w-3.5 h-3.5 text-[#b98158] shrink-0" />
                <span className="truncate">{PROFILE_DATA.academicEmail}</span>
              </a>
              <a href={PROFILE_DATA.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#555555] hover:text-[#111111] transition-colors">
                <GithubIcon className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                <span>github.com/Dhruvdev-Codes</span>
              </a>
              <a href={PROFILE_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#555555] hover:text-[#111111] transition-colors">
                <Shield className="w-3.5 h-3.5 text-[#b98158] shrink-0" />
                <span>LinkedIn Profile</span>
              </a>
              <div className="flex items-center gap-2 text-[#555555]">
                <MapPin className="w-3.5 h-3.5 text-[#b98158] shrink-0" />
                <span>NSUT New Delhi / Indore, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#111111]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#555555]">
          <div>
            © {new Date().getFullYear()} {PROFILE_DATA.name}. Built with Next.js 14, Tailwind CSS, TypeScript & AI Edge Streaming.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#555555] hover:text-[#111111] transition-colors cursor-pointer font-bold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

