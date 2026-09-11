"use client";

import { useState } from "react";
import { BookOpen, Copy, Check } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function ResearchSection() {
  const [copied, setCopied] = useState(false);
  const paper = PROFILE_DATA.research[0];

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(paper.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="research" className="py-16 md:py-24 border-t border-[#1e2738] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>02 // M.TECH RESEARCH & AD-HOC PROTOCOLS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Link Predictability in Ad-Hoc Networks (MANET/VANET)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-2 md:mt-0">
            Netaji Subhas University of Technology (NSUT) • Dept. of CSE
          </p>
        </div>

        <div className="bg-[#151c2a] border border-[#222e44] rounded-xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#222e44]">
            <div>
              <span className="px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
                {paper.status} • {paper.year}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-3 mb-2 leading-snug">
                {paper.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Author: <span className="text-slate-200 font-semibold">{paper.author}</span> ({PROFILE_DATA.academicEmail})
              </p>
            </div>

            <button
              onClick={handleCopyBibtex}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1a2334] border border-[#2d3d5a] hover:border-cyan-400 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied BibTeX!" : "Copy BibTeX"}</span>
            </button>
          </div>

          <div className="py-6 border-b border-[#222e44]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 font-bold">
              Abstract & Formulation
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">{paper.abstract}</p>
          </div>

          <div className="py-6 border-b border-[#222e44]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-teal-300 mb-4 font-bold">
              Mathematical Formulations & Novelty
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paper.mathHighlights.map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#111722] border border-[#1f2a3e] font-mono">
                  <div className="p-2.5 rounded bg-[#161d2b] border border-[#2b3a55] text-cyan-300 text-xs font-semibold mb-3 overflow-x-auto">
                    {item.formula}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-4 font-bold">
              Empirical Evaluation: Proposed Framework vs Reactive Baseline (AODV)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border border-[#222e44] rounded-lg">
                <thead className="bg-[#1a2334] text-slate-300 border-b border-[#222e44]">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Evaluation Metric</th>
                    <th className="py-3 px-4 font-semibold text-cyan-300">Proposed Link Predictor</th>
                    <th className="py-3 px-4 font-semibold text-slate-400">Reactive Baseline (AODV)</th>
                    <th className="py-3 px-4 font-semibold text-teal-300">Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2738] text-slate-300">
                  {paper.benchmarks.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#182131] transition-colors">
                      <td className="py-3 px-4 font-medium">{row.metric}</td>
                      <td className="py-3 px-4 text-cyan-300 font-semibold">{row.proposed}</td>
                      <td className="py-3 px-4 text-slate-400">{row.reactiveBaseline}</td>
                      <td className="py-3 px-4 text-teal-300 font-semibold">Significant Gain</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

