"use client";

import { Terminal, Mail, MapPin, ArrowUp } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { PROFILE_DATA } from "@/data/profile";

interface FooterProps {
  onOpenTerminal: () => void;
}

export function Footer({ onOpenTerminal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-12 font-mono text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-100 text-sm">{PROFILE_DATA.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400">
                M.Tech CSE Scholar
              </span>
            </div>
            <p className="text-zinc-400 text-xs font-sans max-w-md leading-relaxed">
              Specializing in Information & Network Security, Ad-Hoc Wireless Protocols, Distributed Systems, and Cloud Architecture at Netaji Subhas University of Technology (NSUT), New Delhi.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Launch AI Terminal</span>
              </button>
            </div>
          </div>

          {/* Quick Direct Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-200 text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5">
              <li><a href="#research" className="hover:text-emerald-400 transition-colors">01 // Research Paper</a></li>
              <li><a href="#systems" className="hover:text-emerald-400 transition-colors">02 // Systems & Projects</a></li>
              <li><a href="#simulator" className="hover:text-emerald-400 transition-colors">03 // Simulation Lab</a></li>
              <li><a href="#skills" className="hover:text-emerald-400 transition-colors">04 // Skills Matrix</a></li>
              <li><a href="#certifications" className="hover:text-emerald-400 transition-colors">05 // Credentials</a></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-200 text-xs uppercase tracking-wider">Direct Connect</h4>
            <div className="space-y-1.5 text-[11px]">
              <a href={`mailto:${PROFILE_DATA.email}`} className="flex items-center gap-2 hover:text-zinc-200 transition-colors truncate">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{PROFILE_DATA.email}</span>
              </a>
              <a href={`mailto:${PROFILE_DATA.academicEmail}`} className="flex items-center gap-2 hover:text-zinc-200 transition-colors truncate">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{PROFILE_DATA.academicEmail}</span>
              </a>
              <a href={PROFILE_DATA.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-zinc-200 transition-colors">
                <GithubIcon className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>github.com/Dhruvdev-Codes</span>
              </a>
              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>NSUT New Delhi / Indore, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © {new Date().getFullYear()} {PROFILE_DATA.name}. Built with Next.js 14, Tailwind CSS, TypeScript & Vercel AI SDK.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
