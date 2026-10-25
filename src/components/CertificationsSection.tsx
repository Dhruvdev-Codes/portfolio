"use client";

import { Award, CheckCircle2 } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function CertificationsSection() {
  return (
    <section id="credentials" className="py-16 md:py-24 border-t border-[#111111]/15 relative bg-[#ebebea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#b98158] mb-2 font-bold">
              <Award className="w-4 h-4" />
              <span>05 // CREDENTIALS & CERTIFICATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
              Verified Cloud, Security & Leadership Credentials
            </h2>
          </div>
          <p className="text-xs text-[#555555] font-mono mt-2 md:mt-0">
            Industry recognized accreditations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROFILE_DATA.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="bg-[#fdfbf7] border border-[#111111]/20 rounded-xl p-5 flex flex-col justify-between hover:border-[#111111] transition-all shadow-[5px_5px_0px_rgba(17,17,17,0.15)] group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] font-mono px-2.5 py-0.5 rounded border bg-[#ebebea] text-[#111111] border-[#111111]/20 font-bold"
                  >
                    {cert.category}
                  </span>
                  <span className="text-[11px] font-mono text-[#555555]">{cert.date}</span>
                </div>

                <h3 className="text-sm font-bold text-[#111111] group-hover:text-[#b98158] transition-colors mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-[#b98158] font-mono mb-4">{cert.issuer}</p>

                <div className="space-y-1.5 mb-4">
                  {cert.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-[#555555] font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#111111]/15 flex items-center justify-between text-[11px] font-mono text-[#555555]">
                <span>Verified Accreditation</span>
                <span className="text-[#111111] font-bold">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


