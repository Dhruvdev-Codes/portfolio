"use client";

import { useState } from "react";
import { Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { PROFILE_DATA } from "@/data/profile";
import { ProjectDetailsModal } from "@/components/ProjectDetailsModal";
import { Project } from "@/data/types";

export function ProjectsSection() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Systems", "Full-Stack"];
  const filteredProjects =
    filter === "All"
      ? PROFILE_DATA.projects
      : PROFILE_DATA.projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-[#111111]/15 relative bg-[#ebebea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#b98158] mb-2 font-bold">
              <Layers className="w-4 h-4" />
              <span>01 // FEATURED PROJECTS & SYSTEMS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#111111] tracking-tight">
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
                    ? "bg-[#111111] text-[#ebebea] border-[#111111] font-bold shadow-sm"
                    : "bg-[#fdfbf7] text-[#111111] border-[#111111]/20 hover:border-[#111111]"
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
              className="bg-[#fdfbf7] border border-[#111111]/20 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#111111] transition-all group shadow-[5px_5px_0px_rgba(17,17,17,0.15)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#ebebea] border border-[#111111]/20 text-[#111111] font-semibold">
                    {proj.category}
                  </span>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#555555] hover:text-[#111111] transition-colors p-1.5 rounded-md hover:bg-[#ebebea]"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#b98158] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-mono text-[#b98158] mb-4">{proj.subtitle}</p>
                <p className="text-sm text-[#555555] mb-5 leading-relaxed font-sans">{proj.summary}</p>

                {/* Architecture & Engineering Solutions */}
                <div className="mb-5 space-y-3">
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#555555] mb-1.5">
                      Architecture & Design
                    </h4>
                    <ul className="space-y-1 text-xs text-[#111111] font-sans">
                      {proj.architecture.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#b98158] font-mono">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#555555] mb-1.5">
                      Bottlenecks Solved
                    </h4>
                    <ul className="space-y-1 text-xs text-[#555555] font-sans">
                      {proj.bottlenecksSolved.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                {/* Metrics Badges */}
                <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-lg bg-[#ebebea] border border-[#111111]/15 font-mono text-xs">
                  {proj.metrics.map((m, i) => (
                    <div key={i}>
                      <span className="text-[#555555] text-[10px] block">{m.label}</span>
                      <span className="text-[#111111] font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags & Inspect CTA */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#111111]/15">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-[#ebebea] text-[#111111] border border-[#111111]/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="flex items-center gap-1 text-xs font-mono text-[#b98158] hover:text-[#111111] shrink-0 font-semibold cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        <ProjectDetailsModal
          project={selectedProject}
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}

