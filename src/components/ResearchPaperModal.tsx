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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#12161f] border border-slate-200 dark:border-[#222e44] rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans text-slate-900 dark:text-slate-100">
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-100 dark:bg-[#161d2b] border-b border-slate-200 dark:border-[#222e44]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <h3 className="font-mono text-xs sm:text-sm font-bold">Research Preprint & Technical Formulation</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs font-sans leading-relaxed">
          <div className="border-b border-slate-200 dark:border-[#222e44] pb-4">
            <span className="px-2.5 py-1 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-mono text-[11px] font-semibold border border-cyan-500/30">
              {paper.status} • {paper.year}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2 leading-snug">
              {paper.title}
            </h2>
            <p className="font-mono text-slate-500 mt-1">
              Author: <strong className="text-slate-800 dark:text-slate-200">{paper.author}</strong> ({PROFILE_DATA.academicEmail})
            </p>
            <p className="font-mono text-[11px] text-slate-500">Affiliation: {paper.affiliation}</p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-cyan-600 dark:text-cyan-400 mb-2">
              1. Problem Statement & Motivation
            </h4>
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              Mobile Ad-Hoc Networks (MANETs) and Vehicular Networks (VANETs) suffer frequent packet loss caused by unpredictable node motion, shadowing, and energy depletion. Standard reactive protocols (AODV, DSR) only trigger route discovery after links fail, creating latency spikes and control packet flooding.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-teal-600 dark:text-teal-400 mb-2">
              2. Mathematical Models & Signal Processing
            </h4>
            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44] font-mono">
                <div className="text-cyan-600 dark:text-cyan-400 font-bold mb-1">A. Exponential RSSI Smoothing:</div>
                <div className="bg-white dark:bg-[#0f141e] p-2 rounded border border-slate-200 dark:border-[#222e44] text-xs font-semibold mb-1">
                  {"r̂_t = α · r_t + (1 - α) · r̂_{t-1}"}
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                  Mitigates short-term multipath Rayleigh fading noise without adding transceiver computational lag.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44] font-mono">
                <div className="text-teal-600 dark:text-teal-400 font-bold mb-1">B. Kinematic Link Expiration Time (LET):</div>
                <div className="bg-white dark:bg-[#0f141e] p-2 rounded border border-slate-200 dark:border-[#222e44] text-xs font-semibold mb-1">
                  LET = (-ab + √(a² + b²) · R² - (ad - bc)²) / (a² + b²)
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                  Calculated from relative coordinates, velocities, and transmission radius R. When LET &lt; τ, proactive route pre-caching is triggered.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44] font-mono">
                <div className="text-sky-600 dark:text-sky-400 font-bold mb-1">C. Byzantine Trust Scoring:</div>
                <div className="bg-white dark:bg-[#0f141e] p-2 rounded border border-slate-200 dark:border-[#222e44] text-xs font-semibold mb-1">
                  T_node(t) = w_1 · S_success + w_2 · S_delay - w_3 · S_drop
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                  Dynamic behavioral scoring penalizing black-hole and packet-drop attacks in decentralized environments.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-mono text-xs uppercase font-bold text-slate-700 dark:text-slate-300">BibTeX Citation</h4>
              <button onClick={handleCopyBibtex} className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 dark:bg-[#1a2334] border border-slate-200 dark:border-[#2d3d5a] text-xs font-mono text-cyan-600 dark:text-cyan-400 cursor-pointer">
                {copiedBibtex ? <Check className="w-3.5 h-3.5 text-teal-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBibtex ? "Copied!" : "Copy BibTeX"}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#0f141e] border border-slate-200 dark:border-[#222e44] font-mono text-[11px] overflow-x-auto text-slate-700 dark:text-slate-300">
              {paper.bibtex}
            </pre>
          </div>
        </div>
        <div className="px-5 py-3 bg-slate-100 dark:bg-[#161d2b] border-t border-slate-200 dark:border-[#222e44] flex justify-between items-center text-xs font-mono text-slate-500">
          <span>NSUT New Delhi • Dept. of CSE</span>
          <button onClick={onClose} className="px-3.5 py-1.5 rounded-lg bg-slate-200 dark:bg-[#1f2b40] font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
