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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#111111]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#fdfbf7] border border-[#111111]/20 rounded-xl shadow-[10px_10px_0px_rgba(17,17,17,0.15)] flex flex-col overflow-hidden font-mono text-[#111111]">
        <div className="flex items-center justify-between px-5 py-4 bg-[#ebebea] border-b border-[#111111]/15 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#b98158]" />
            <h3 className="font-mono text-xs sm:text-sm font-black uppercase tracking-tight">Curriculum Vitae / Resume</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCopyText} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fdfbf7] border border-[#111111]/20 text-xs font-mono font-bold hover:bg-[#ebebea] transition-colors cursor-pointer shadow-sm">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111111] hover:bg-[#b98158] text-[#fdfbf7] text-xs font-mono font-bold transition-colors cursor-pointer shadow-sm">
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button onClick={onClose} className="p-1 rounded-lg text-[#111111]/50 hover:text-[#111111] transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 font-mono print:p-0">
          <div className="border-b border-[#111111]/15 pb-4">
            <h1 className="text-2xl font-black text-[#111111] tracking-tight">{PROFILE_DATA.name}</h1>
            <p className="text-xs text-[#b98158] font-black uppercase mt-1">{PROFILE_DATA.headline}</p>
            <div className="flex flex-wrap gap-3 font-mono text-[11px] text-[#555555] mt-2 font-bold">
              <span>{PROFILE_DATA.email}</span>
              <span>{PROFILE_DATA.phone}</span>
              <span>{PROFILE_DATA.location}</span>
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase text-[#111111] mb-2 border-b border-[#111111]/10 pb-1">Education</h4>
            <div className="space-y-2.5 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#ebebea] border border-[#111111]/15 shadow-sm">
                <div className="flex justify-between font-black text-[#111111]"><span>NSUT, New Delhi — M.Tech in CSE (InfoSec)</span><span className="text-[#b98158]">2024–2026</span></div>
                <p className="text-[#555555] font-sans text-[11.5px] mt-1">Ad-Hoc Wireless Networks, Cryptography, Distributed Systems</p>
              </div>
              <div className="p-3 rounded-lg bg-[#ebebea] border border-[#111111]/15 shadow-sm">
                <div className="flex justify-between font-black text-[#111111]"><span>AITR, Indore — B.Tech in CSE</span><span className="text-[#555555]">2021–2025</span></div>
                <p className="text-[#555555] font-sans text-[11.5px] mt-1">DSA, Operating Systems, Database Systems, Computer Networks</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase text-[#111111] mb-2 border-b border-[#111111]/10 pb-1">Research & Publications</h4>
            <div className="p-3 rounded-lg bg-[#ebebea] border border-[#111111]/15 text-xs shadow-sm">
              <span className="font-black block text-[#111111]">Link Predictability in Ad-Hoc Networks: Frameworks for Secure and Robust Communications</span>
              <p className="text-[#555555] font-sans text-[11.5px] mt-1.5 leading-relaxed">Proactive kinematic forecasting (LET), exponential RSSI filtering, and lightweight AEAD ciphers reducing routing overhead by 61% and boosting PDR to 96.4%.</p>
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase text-[#111111] mb-2 border-b border-[#111111]/10 pb-1">Certifications & Credentials</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              {PROFILE_DATA.certifications.map((c, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#ebebea] border border-[#111111]/15 shadow-sm">
                  <span className="font-black text-[#111111] block text-[11px]">{c.title}</span>
                  <span className="text-[10px] text-[#555555] font-bold mt-0.5 block">{c.issuer} ({c.date})</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase text-[#111111] mb-2 border-b border-[#111111]/10 pb-1">Technical Competencies</h4>
            <div className="p-3.5 rounded-lg bg-[#ebebea] border border-[#111111]/15 text-xs font-mono space-y-1.5 shadow-sm">
              <div><strong className="text-[#b98158] uppercase font-black">Languages:</strong> <span className="text-[#555555] font-bold">C++, Python, JavaScript (ES6+), TypeScript, Java, SQL, Bash</span></div>
              <div><strong className="text-[#b98158] uppercase font-black">Systems & Security:</strong> <span className="text-[#555555] font-bold">MANET/VANET, AEAD Ciphers, Routing Predictability, OS Internals</span></div>
              <div><strong className="text-[#b98158] uppercase font-black">Cloud & Web:</strong> <span className="text-[#555555] font-bold">AWS (VPC, IAM, EC2, RDS, S3), Docker, Next.js, Node.js, MongoDB, MySQL</span></div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 bg-[#ebebea] border-t border-[#111111]/15 flex justify-between items-center text-xs font-mono text-[#555555] print:hidden">
          <span className="font-bold">NSUT Delhi • M.Tech CSE Scholar</span>
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
