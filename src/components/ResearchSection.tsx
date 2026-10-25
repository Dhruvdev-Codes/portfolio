"use client";

import { useState } from "react";
import { BookOpen, Copy, Check, FileText } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";
import { ResearchPaperModal } from "@/components/ResearchPaperModal";

export function ResearchSection() {
  const [copied, setCopied] = useState(false);
  const [isPaperModalOpen, setIsPaperModalOpen] = useState(false);
  const paper = PROFILE_DATA.research[0];

  const handleCopyBibtex = () => {
    navigator.clipboard.writeText(paper.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="research" className="py-16 md:py-24 border-t border-[#111111]/15 relative bg-[#ebebea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#b98158] mb-2 font-bold">
              <BookOpen className="w-4 h-4" />
              <span>02 // M.TECH RESEARCH & AD-HOC PROTOCOLS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
              Link Predictability in Ad-Hoc Networks (MANET/VANET)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#555555] font-mono mt-2 md:mt-0">
            Netaji Subhas University of Technology (NSUT) • Dept. of CSE
          </p>
        </div>

        <div className="bg-[#fdfbf7] border border-[#111111]/20 rounded-xl p-6 sm:p-8 shadow-[5px_5px_0px_rgba(17,17,17,0.15)]">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#111111]/15">
            <div>
              <span className="px-3 py-1 rounded-md bg-[#ebebea] border border-[#111111]/20 text-[#111111] text-xs font-mono font-bold">
                {paper.status} • {paper.year}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mt-3 mb-2 leading-snug">
                {paper.title}
              </h3>
              <p className="text-xs text-[#555555] font-mono">
                Author: <span className="text-[#111111] font-semibold">{paper.author}</span> ({PROFILE_DATA.academicEmail})
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsPaperModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#111111] hover:bg-[#b98158] text-[#ebebea] text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Read Full Technical Paper</span>
              </button>

              <button
                onClick={handleCopyBibtex}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#ebebea] border border-[#111111]/20 hover:border-[#111111] text-[#111111] text-xs font-mono transition-all cursor-pointer shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#111111]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied BibTeX!" : "Copy BibTeX"}</span>
              </button>
            </div>
          </div>

          <div className="py-6 border-b border-[#111111]/15">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#b98158] mb-2 font-bold">
              Abstract & Formulation
            </h4>
            <p className="text-sm text-[#555555] leading-relaxed font-sans">{paper.abstract}</p>
          </div>

          <div className="py-6 border-b border-[#111111]/15">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#111111] mb-4 font-bold">
              Mathematical Formulations & Novelty
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {paper.mathHighlights.map((item, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-[#ebebea] border border-[#111111]/15 font-mono">
                  <div className="p-2.5 rounded bg-[#fdfbf7] border border-[#111111]/20 text-[#111111] text-xs font-semibold mb-3 overflow-x-auto shadow-sm">
                    {item.formula}
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed font-sans">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#111111] mb-4 font-bold">
              Empirical Evaluation: Proposed Framework vs Reactive Baseline (AODV)
            </h4>
            <div className="overflow-x-auto pb-2">
              <table className="w-full min-w-[560px] text-left font-mono text-xs border border-[#111111]/20 rounded-lg">
                <thead className="bg-[#ebebea] text-[#111111] border-b border-[#111111]/20">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Evaluation Metric</th>
                    <th className="py-3 px-4 font-semibold text-[#b98158]">Proposed Link Predictor</th>
                    <th className="py-3 px-4 font-semibold text-[#555555]">Reactive Baseline (AODV)</th>
                    <th className="py-3 px-4 font-semibold text-[#111111]">Improvement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#111111]/10 text-[#111111]">
                  {paper.benchmarks.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#ebebea] transition-colors">
                      <td className="py-3 px-4 font-medium">{row.metric}</td>
                      <td className="py-3 px-4 text-[#b98158] font-bold">{row.proposed}</td>
                      <td className="py-3 px-4 text-[#555555]">{row.reactiveBaseline}</td>
                      <td className="py-3 px-4 text-[#111111] font-semibold">Significant Gain</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Research Paper Deep Dive Modal */}
        <ResearchPaperModal
          isOpen={isPaperModalOpen}
          onClose={() => setIsPaperModalOpen(false)}
        />
      </div>
    </section>
  );
}

