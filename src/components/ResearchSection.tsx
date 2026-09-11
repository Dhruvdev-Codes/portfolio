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
    <section id="research" className="py-16 md:py-24 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>01 // RESEARCH & ACADEMIC CONTRIBUTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
              M.Tech Research & Link Predictability Framework
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-2 md:mt-0">
            Netaji Subhas University of Technology (NSUT) • Dept. of CSE
          </p>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
            <div>
              <span className="px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                {paper.status} • {paper.year}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-3 mb-2 leading-snug">
                {paper.title}
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Author: <span className="text-zinc-200">{paper.author}</span> ({PROFILE_DATA.academicEmail})
              </p>
            </div>

            <button
              onClick={handleCopyBibtex}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-emerald-500 text-zinc-300 text-xs font-mono transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied BibTeX!" : "Copy BibTeX"}</span>
            </button>
          </div>

          <div className="py-6 border-b border-zinc-800/80">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Abstract & Problem Formulation
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed">{paper.abstract}</p>
          </div>

          <div className="py-6 border-b border-zinc-800/80">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-4">
              Mathematical Formulations & Novelty
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paper.mathHighlights.map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-zinc-900/70 border border-zinc-800 font-mono">
                  <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800 text-emerald-400 text-xs font-semibold mb-3 overflow-x-auto">
                    {item.formula}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 mb-4">
              Empirical Evaluation: Proposed Framework vs Reactive Baseline (AODV)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border border-zinc-800 rounded-lg">
                <thead className="bg-zinc-900/90 text-zinc-400 border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Evaluation Metric</th>
                    <th className="py-3 px-4 font-semibold text-emerald-400">Proposed Link Predictor</th>
                    <th className="py-3 px-4 font-semibold text-zinc-400">Reactive Baseline (AODV)</th>
                    <th className="py-3 px-4 font-semibold text-cyan-400">Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {paper.benchmarks.map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3 px-4 font-medium">{row.metric}</td>
                      <td className="py-3 px-4 text-emerald-400 font-semibold">{row.proposed}</td>
                      <td className="py-3 px-4 text-zinc-400">{row.reactiveBaseline}</td>
                      <td className="py-3 px-4 text-cyan-400 font-semibold">Significant Gain</td>
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
