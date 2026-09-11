"use client";

import { Award, CheckCircle2 } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-16 md:py-24 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-purple-400 mb-2">
              <Award className="w-4 h-4" />
              <span>05 // CREDENTIALS & CERTIFICATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
              Verified Cloud, Security & Leadership Credentials
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-mono mt-2 md:mt-0">
            Industry recognized accreditations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROFILE_DATA.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between hover:border-zinc-700 transition-all shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      cert.category === "Cloud"
                        ? "bg-amber-950/60 text-amber-300 border-amber-500/30"
                        : cert.category === "Security"
                        ? "bg-emerald-950/60 text-emerald-300 border-emerald-500/30"
                        : "bg-purple-950/60 text-purple-300 border-purple-500/30"
                    }`}
                  >
                    {cert.category}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">{cert.date}</span>
                </div>

                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-zinc-400 font-mono mb-4">{cert.issuer}</p>

                <div className="space-y-1.5 mb-4">
                  {cert.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Verified Accreditation</span>
                <span className="text-emerald-400 font-medium">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
