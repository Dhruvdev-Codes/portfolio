"use client";

import { Cpu, Terminal, Shield, Cloud, Database } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function SkillsMatrix() {
  const { languages, systemsAndSecurity, cloudAndDevOps, webAndDatabases } = PROFILE_DATA.skills;

  const categories = [
    { title: "Languages & Core", icon: Terminal, items: languages, color: "text-cyan-600 dark:text-cyan-400" },
    { title: "Systems & Network Security", icon: Shield, items: systemsAndSecurity, color: "text-teal-600 dark:text-teal-400" },
    { title: "Cloud Architecture & DevOps", icon: Cloud, items: cloudAndDevOps, color: "text-sky-600 dark:text-sky-400" },
    { title: "Web Engines & Databases", icon: Database, items: webAndDatabases, color: "text-cyan-600 dark:text-cyan-300" },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-slate-200 dark:border-[#1e2738] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-600 dark:text-cyan-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>04 // TECHNICAL SKILLS MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Systems, Security, Cloud & Software Competencies
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-2 md:mt-0">
            Engineered for low-latency, scalable infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44] rounded-xl p-6 shadow-md dark:shadow-xl hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-[#222e44] mb-4">
                  <Icon className={`w-4 h-4 ${cat.color}`} />
                  <h3 className="font-mono text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                    {cat.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.items.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1f2a3e] hover:border-cyan-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#1a2334] text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-cyan-500/30">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight font-sans">{skill.desc}</p>
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


