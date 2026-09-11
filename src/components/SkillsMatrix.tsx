"use client";

import { Cpu, Terminal, Shield, Cloud, Database } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";

export function SkillsMatrix() {
  const { languages, systemsAndSecurity, cloudAndDevOps, webAndDatabases } = PROFILE_DATA.skills;

  const categories = [
    { title: "Languages & Core", icon: Terminal, items: languages, color: "text-emerald-400" },
    { title: "Systems & Network Security", icon: Shield, items: systemsAndSecurity, color: "text-cyan-400" },
    { title: "Cloud Architecture & DevOps", icon: Cloud, items: cloudAndDevOps, color: "text-amber-400" },
    { title: "Web Engines & Databases", icon: Database, items: webAndDatabases, color: "text-purple-400" },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-amber-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>04 // TECHNICAL SKILLS MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
              Systems, Security, Cloud & Software Competencies
            </h2>
          </div>
          <p className="text-xs text-zinc-400 font-mono mt-2 md:mt-0">
            Engineered for low-latency, scalable infrastructure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-lg hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-800 mb-4">
                  <Icon className={`w-4 h-4 ${cat.color}`} />
                  <h3 className="font-mono text-sm font-semibold text-zinc-200 uppercase tracking-wider">
                    {cat.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.items.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-semibold text-zinc-200">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-emerald-400 border border-zinc-700">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-tight font-sans">{skill.desc}</p>
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
