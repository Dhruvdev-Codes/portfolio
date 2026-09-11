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
    <section id="systems" className="py-16 md:py-24 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <Layers className="w-4 h-4" />
              <span>02 // ARCHITECTURE-FIRST SYSTEMS & ENGINEERING</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
              Systems, Distributed Networks & Full-Stack Platforms
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-md border transition-all ${
                  filter === cat
                    ? "bg-zinc-800 text-emerald-400 border-emerald-500/50"
                    : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700"
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
              className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-all group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                    {proj.category}
                  </span>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-zinc-100 transition-colors p-1"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-mono text-zinc-400 mb-4">{proj.subtitle}</p>
                <p className="text-sm text-zinc-300 mb-5 leading-relaxed">{proj.summary}</p>

                {/* Architecture & Engineering Solutions */}
                <div className="mb-5 space-y-3">
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Architecture & Design
                    </h4>
                    <ul className="space-y-1 text-xs text-zinc-300 font-sans">
                      {proj.architecture.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-mono">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Bottlenecks Solved
                    </h4>
                    <ul className="space-y-1 text-xs text-zinc-400 font-sans">
                      {proj.bottlenecksSolved.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/80 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                {/* Metrics Badges */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 font-mono text-xs">
                  {proj.metrics.map((m, i) => (
                    <div key={i}>
                      <span className="text-zinc-500 text-[10px] block">{m.label}</span>
                      <span className="text-emerald-400 font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
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
