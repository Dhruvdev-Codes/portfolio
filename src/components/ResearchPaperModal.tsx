"use client";

import { useState } from "react";
import { X, BookOpen, Copy, Check } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

interface ResearchPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResearchPaperModal({ isOpen, onClose }: ResearchPaperModalProps) {
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const paper = PROFILE_DATA.research[0];

  if (!isOpen) return null;

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(paper.bibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#111111]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#fdfbf7] border border-[#111111]/20 rounded-xl shadow-[10px_10px_0px_rgba(17,17,17,0.15)] flex flex-col overflow-hidden font-mono text-[#111111]">
        <div className="flex items-center justify-between px-5 py-4 bg-[#ebebea] border-b border-[#111111]/15">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#b98158]" />
            <h3 className="font-mono text-xs sm:text-sm font-black uppercase tracking-tight">Research Preprint & Technical Formulation</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#111111]/50 hover:text-[#111111] transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs font-mono leading-relaxed">
          <div className="border-b border-[#111111]/15 pb-5">
            <span className="px-2.5 py-1 rounded bg-[#111111] text-[#fdfbf7] font-mono text-[10px] font-bold uppercase tracking-tight">
              {paper.status} • {paper.year}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#111111] mt-2.5 leading-snug tracking-tight">
              {paper.title}
            </h2>
            <p className="font-mono text-[#555555] mt-1.5 text-[11px]">
              Author: <strong className="text-[#111111] font-bold">{paper.author}</strong> ({PROFILE_DATA.academicEmail})
            </p>
            <p className="font-mono text-[11px] text-[#555555]">Affiliation: {paper.affiliation}</p>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase text-[#b98158] mb-2 border-b border-[#111111]/10 pb-1">
              1. Problem Statement & Motivation
            </h4>
            <p className="text-[#555555] font-sans leading-relaxed text-[12.5px] mb-2">
              Mobile Ad-Hoc Networks (MANETs) and Vehicular Networks (VANETs) suffer frequent packet loss caused by unpredictable node motion, shadowing, and energy depletion. Standard reactive protocols (AODV, DSR) only trigger route discovery after links fail, creating latency spikes and control packet flooding.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase text-[#111111] mb-2 border-b border-[#111111]/10 pb-1">
              2. Mathematical Models & Signal Processing
            </h4>
            <div className="space-y-3.5">
              <div className="p-4 rounded-lg bg-[#ebebea] border border-[#111111]/15">
                <div className="text-[#b98158] font-black uppercase text-[11px] mb-1.5">A. Exponential RSSI Smoothing:</div>
                <div className="bg-[#fdfbf7] p-2.5 rounded border border-[#111111]/25 text-xs font-bold text-[#111111] mb-1.5 shadow-sm">
                  {"r̂_t = α · r_t + (1 - α) · r̂_{t-1}"}
                </div>
                <p className="text-[11px] text-[#555555] font-sans">
                  Mitigates short-term multipath Rayleigh fading noise without adding transceiver computational lag.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#ebebea] border border-[#111111]/15">
                <div className="text-[#b98158] font-black uppercase text-[11px] mb-1.5">B. Kinematic Link Expiration Time (LET):</div>
                <div className="bg-[#fdfbf7] p-2.5 rounded border border-[#111111]/25 text-xs font-bold text-[#111111] mb-1.5 shadow-sm">
                  LET = (-ab + √(a² + b²) · R² - (ad - bc)²) / (a² + b²)
                </div>
                <p className="text-[11px] text-[#555555] font-sans">
                  Calculated from relative coordinates, velocities, and transmission radius R. When LET &lt; τ, proactive route pre-caching is triggered.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#ebebea] border border-[#111111]/15">
                <div className="text-[#b98158] font-black uppercase text-[11px] mb-1.5">C. Byzantine Trust Scoring:</div>
                <div className="bg-[#fdfbf7] p-2.5 rounded border border-[#111111]/25 text-xs font-bold text-[#111111] mb-1.5 shadow-sm">
                  T_node(t) = w_1 · S_success + w_2 · S_delay - w_3 · S_drop
                </div>
                <p className="text-[11px] text-[#555555] font-sans">
                  Dynamic behavioral scoring penalizing black-hole and packet-drop attacks in decentralized environments.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-xs uppercase font-black text-[#111111]">BibTeX Citation</h4>
              <button 
                onClick={handleCopyBibtex} 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] text-[#fdfbf7] hover:bg-[#b98158] transition-colors text-xs font-mono font-bold cursor-pointer shadow-sm"
              >
                {copiedBibtex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBibtex ? "Copied!" : "Copy BibTeX"}</span>
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-[#ebebea] border border-[#111111]/15 font-mono text-[11px] overflow-x-auto text-[#111111] leading-relaxed shadow-inner">
              {paper.bibtex}
            </pre>
          </div>
        </div>
        <div className="px-5 py-4 bg-[#ebebea] border-t border-[#111111]/15 flex justify-between items-center text-xs font-mono text-[#555555]">
          <span className="font-bold">NSUT New Delhi • Dept. of CSE</span>
          <button 
            onClick={onClose} 
            className="px-5 py-2 rounded-lg bg-[#111111] hover:bg-[#b98158] text-[#fdfbf7] font-bold transition-colors cursor-pointer shadow-[3px_3px_0px_rgba(185,129,88,0.4)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
