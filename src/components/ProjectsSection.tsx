"use client";

import { useState } from "react";
import { Layers, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { PROFILE_DATA } from "@/data/profile";

export function ProjectsSection() {
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Systems", "Full-Stack"];
  const filteredProjects =
    filter === "All"
      ? PROFILE_DATA.projects
      : PROFILE_DATA.projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-[#1e2738] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <Layers className="w-4 h-4" />
              <span>01 // FEATURED PROJECTS & SYSTEMS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Systems, Distributed Networks & Full-Stack Platforms
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-cyan-950 text-cyan-300 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                    : "bg-[#151c2a] text-slate-400 border-[#222e44] hover:border-slate-600 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#151c2a] border border-[#222e44] rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-500/50 transition-all group shadow-xl hover:shadow-cyan-950/20"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#1d273a] border border-[#2b3a55] text-cyan-300">
                    {proj.category}
                  </span>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-cyan-300 transition-colors p-1.5 rounded-md hover:bg-[#1f2b40]"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/80 mb-4">{proj.subtitle}</p>
                <p className="text-sm text-slate-300 mb-5 leading-relaxed font-sans">{proj.summary}</p>

                {/* Architecture & Engineering Solutions */}
                <div className="mb-5 space-y-3">
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Architecture & Design
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-300 font-sans">
                      {proj.architecture.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-mono">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Bottlenecks Solved
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-400 font-sans">
                      {proj.bottlenecksSolved.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                {/* Metrics Badges */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-lg bg-[#111722] border border-[#1f2a3e] font-mono text-xs">
                  {proj.metrics.map((m, i) => (
                    <div key={i}>
                      <span className="text-slate-400 text-[10px] block">{m.label}</span>
                      <span className="text-cyan-300 font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[#182132] text-slate-300 border border-[#26354f]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

