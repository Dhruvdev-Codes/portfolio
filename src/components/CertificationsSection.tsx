"use client";

import { Award, CheckCircle2 } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function CertificationsSection() {
  return (
    <section id="credentials" className="py-16 md:py-24 border-t border-slate-200 dark:border-[#1e2738] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-600 dark:text-cyan-400 mb-2">
              <Award className="w-4 h-4" />
              <span>05 // CREDENTIALS & CERTIFICATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Verified Cloud, Security & Leadership Credentials
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-2 md:mt-0">
            Industry recognized accreditations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROFILE_DATA.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44] rounded-xl p-5 flex flex-col justify-between hover:border-cyan-500/50 transition-all shadow-md dark:shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded border ${
                      cert.category === "Cloud"
                        ? "bg-cyan-50 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 border-cyan-500/30"
                        : cert.category === "Security"
                        ? "bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 border-teal-500/30"
                        : "bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border-sky-500/30"
                    }`}
                  >
                    {cert.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">{cert.date}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-cyan-600 dark:text-cyan-400/80 font-mono mb-4">{cert.issuer}</p>

                <div className="space-y-1.5 mb-4">
                  {cert.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-[#1e2738] flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Verified Accreditation</span>
                <span className="text-teal-600 dark:text-teal-400 font-medium">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


