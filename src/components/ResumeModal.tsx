"use client";

import { useState } from "react";
import { X, Printer, Copy, Check, FileText } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const cv = `${PROFILE_DATA.name.toUpperCase()}
${PROFILE_DATA.title} — ${PROFILE_DATA.institution}
Email: ${PROFILE_DATA.email} | Academic: ${PROFILE_DATA.academicEmail}
Phone: ${PROFILE_DATA.phone} | Location: ${PROFILE_DATA.location}
GitHub: ${PROFILE_DATA.github} | LinkedIn: ${PROFILE_DATA.linkedin}

ACADEMIC BACKGROUND:
• M.Tech CSE (InfoSec) — NSUT Delhi (2024-2026)
• B.Tech CSE — AITR Indore (2021-2025)

RESEARCH:
• "Link Predictability in Ad-Hoc Networks: Frameworks for Secure and Robust Communications" (NSUT 2026)
  LET kinematic forecasting, exponential RSSI smoothing, AEAD cryptography.

CERTIFICATIONS:
• AWS Academy Graduate (Cloud Architecting & Cloud Foundations)
• Google Cybersecurity Professional Certificate
• Google Cloud Digital Training
• IIT Guwahati UDGAM Campus Ambassador

PROJECTS:
• Adaptive MANET/VANET Link Predictor (C++, Python, AEAD)
• WorkVibe Mentor-Mentee Network (Node.js, Express, MongoDB)
• SkillXchange Marketplace (JavaScript, MongoDB, Tailwind)
• Travel World Itinerary App (MySQL, HTML5/JS)

SKILLS:
C++, Python, JavaScript, TypeScript, AWS, Docker, Linux, Next.js, Node.js, MongoDB, MySQL`;

    navigator.clipboard.writeText(cv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#12161f] border border-slate-200 dark:border-[#222e44] rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans text-slate-900 dark:text-slate-100">
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-100 dark:bg-[#161d2b] border-b border-slate-200 dark:border-[#222e44] print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <h3 className="font-mono text-xs sm:text-sm font-bold">Curriculum Vitae / Resume</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCopyText} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#1b2436] border border-slate-200 dark:border-[#2a3850] text-xs font-mono cursor-pointer">
              {copied ? <Check className="w-3.5 h-3.5 text-teal-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold cursor-pointer">
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 font-sans print:p-0">
          <div className="border-b border-slate-200 dark:border-[#222e44] pb-3">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{PROFILE_DATA.name}</h1>
            <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-semibold mt-0.5">{PROFILE_DATA.headline}</p>
            <div className="flex flex-wrap gap-3 font-mono text-[11px] text-slate-500 mt-2">
              <span>{PROFILE_DATA.email}</span>
              <span>{PROFILE_DATA.phone}</span>
              <span>{PROFILE_DATA.location}</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-cyan-600 dark:text-cyan-400 mb-1.5">Education</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44]">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white"><span>NSUT, New Delhi — M.Tech in CSE (InfoSec)</span><span className="font-mono text-cyan-600 dark:text-cyan-400">2024–2026</span></div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Ad-Hoc Wireless Networks, Cryptography, Distributed Systems</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44]">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white"><span>AITR, Indore — B.Tech in CSE</span><span className="font-mono text-slate-500">2021–2025</span></div>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">DSA, Operating Systems, Database Systems, Computer Networks</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-teal-600 dark:text-teal-400 mb-1.5">Research & Publications</h4>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44] text-xs">
              <span className="font-bold block text-slate-900 dark:text-white">Link Predictability in Ad-Hoc Networks: Frameworks for Secure and Robust Communications</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11.5px] mt-1 leading-relaxed">Proactive kinematic forecasting (LET), exponential RSSI filtering, and lightweight AEAD ciphers reducing routing overhead by 61% and boosting PDR to 96.4%.</p>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-sky-600 dark:text-sky-400 mb-1.5">Certifications & Credentials</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {PROFILE_DATA.certifications.map((c, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44]">
                  <span className="font-bold text-slate-900 dark:text-white block text-[11px]">{c.title}</span>
                  <span className="text-[10px] text-slate-500">{c.issuer} ({c.date})</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-slate-700 dark:text-slate-300 mb-1.5">Technical Competencies</h4>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44] text-xs font-mono space-y-1">
              <div><strong className="text-cyan-600 dark:text-cyan-400">Languages:</strong> C++, Python, JavaScript (ES6+), TypeScript, Java, SQL, Bash</div>
              <div><strong className="text-teal-600 dark:text-teal-400">Systems & Security:</strong> MANET/VANET, AEAD Ciphers, Routing Predictability, OS Internals</div>
              <div><strong className="text-sky-600 dark:text-sky-400">Cloud & Web:</strong> AWS (VPC, IAM, EC2, RDS, S3), Docker, Next.js, Node.js, MongoDB, MySQL</div>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 bg-slate-100 dark:bg-[#161d2b] border-t border-slate-200 dark:border-[#222e44] flex justify-between items-center text-xs font-mono text-slate-500 print:hidden">
          <span>NSUT Delhi • M.Tech CSE Scholar</span>
          <button onClick={onClose} className="px-3 py-1 rounded bg-slate-200 dark:bg-[#1f2b40] font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">Close</button>
        </div>
      </div>
    </div>
  );
}
