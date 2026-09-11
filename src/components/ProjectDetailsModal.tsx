"use client";

import { X, CheckCircle2 } from "lucide-react";
import { Project } from "@/data/types";
import { GithubIcon } from "./GithubIcon";

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, isOpen, onClose }: ProjectDetailsModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#12161f] border border-slate-200 dark:border-[#222e44] rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-100 dark:bg-[#161d2b] border-b border-slate-200 dark:border-[#222e44]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 font-semibold">
              {project.category}
            </span>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate max-w-[280px] sm:max-w-md">
              {project.title}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 text-xs font-sans">
          <div>
            <p className="font-mono text-cyan-600 dark:text-cyan-400 font-semibold text-xs mb-1.5">{project.subtitle}</p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[13px]">{project.summary}</p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44]">
            <h4 className="font-mono text-xs uppercase font-bold text-rose-600 dark:text-rose-400 mb-1">
              Core Engineering Problem
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{project.problem}</p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-cyan-600 dark:text-cyan-400 mb-2">
              System Architecture & Pipeline
            </h4>
            <ul className="space-y-1.5">
              {project.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase font-bold text-teal-600 dark:text-teal-400 mb-2">
              Bottlenecks Solved
            </h4>
            <ul className="space-y-1.5">
              {project.bottlenecksSolved.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44] font-mono text-center">
                <span className="text-[10px] text-slate-500 block truncate">{m.label}</span>
                <span className="text-sm font-bold text-cyan-700 dark:text-cyan-300">{m.value}</span>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase font-bold text-slate-500 mb-1.5">Technology Stack</h4>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded bg-slate-100 dark:bg-[#182132] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#222e44]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-100 dark:bg-[#161d2b] border-t border-slate-200 dark:border-[#222e44] flex items-center justify-between font-mono text-xs">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          ) : (
            <span className="text-slate-500">Internal NSUT Project</span>
          )}
          <button onClick={onClose} className="px-3.5 py-1.5 rounded-lg bg-slate-200 dark:bg-[#1f2b40] font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
