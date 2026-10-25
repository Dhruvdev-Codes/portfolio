"use client";

import { Cpu, Terminal, Shield, Cloud, Database } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function SkillsMatrix() {
  const { languages, systemsAndSecurity, cloudAndDevOps, webAndDatabases } = PROFILE_DATA.skills;

  const categories = [
    { title: "Languages & Core", icon: Terminal, items: languages, color: "text-[#b98158]" },
    { title: "Systems & Network Security", icon: Shield, items: systemsAndSecurity, color: "text-[#111111]" },
    { title: "Cloud Architecture & DevOps", icon: Cloud, items: cloudAndDevOps, color: "text-[#b98158]" },
    { title: "Web Engines & Databases", icon: Database, items: webAndDatabases, color: "text-[#111111]" },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-[#111111]/15 relative bg-[#ebebea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#b98158] mb-2 font-bold">
              <Cpu className="w-4 h-4" />
              <span>04 // TECHNICAL SKILLS MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
              Systems, Security, Cloud & Software Competencies
            </h2>
          </div>
          <p className="text-xs text-[#555555] font-mono mt-2 md:mt-0">
            Engineered for low-latency, scalable infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-[#fdfbf7] border border-[#111111]/20 rounded-xl p-6 shadow-[5px_5px_0px_rgba(17,17,17,0.15)] hover:border-[#111111] transition-all"
              >
                <div className="flex items-center gap-2.5 pb-4 border-b border-[#111111]/15 mb-4">
                  <Icon className={`w-4 h-4 ${cat.color}`} />
                  <h3 className="font-mono text-sm font-bold text-[#111111] uppercase tracking-wider">
                    {cat.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.items.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg bg-[#ebebea] border border-[#111111]/15 hover:border-[#111111]/40 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-semibold text-[#111111]">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#111111]/5 text-[#111111] border border-[#111111]/20">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#555555] leading-tight font-sans">{skill.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



