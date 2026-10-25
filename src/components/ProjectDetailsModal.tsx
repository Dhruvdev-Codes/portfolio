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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#111111]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#fdfbf7] border border-[#111111]/20 rounded-xl shadow-[10px_10px_0px_rgba(17,17,17,0.15)] flex flex-col overflow-hidden font-mono text-[#111111]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ebebea] border-b border-[#111111]/15">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#111111] text-[#fdfbf7] border border-[#111111] font-bold uppercase tracking-tighter">
              {project.category}
            </span>
            <h3 className="font-black text-sm sm:text-base text-[#111111] truncate max-w-[280px] sm:max-w-md uppercase tracking-tight">
              {project.title}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-[#111111]/50 hover:text-[#111111] transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-xs font-mono">
          <div>
            <p className="font-bold text-[#b98158] text-[11px] uppercase tracking-wide mb-1.5">{project.subtitle}</p>
            <p className="text-[#555555] font-sans leading-relaxed text-[13px]">{project.summary}</p>
          </div>

          <div className="p-4 rounded-lg bg-[#ebebea] border border-[#111111]/10">
            <h4 className="font-bold text-[11px] uppercase text-[#111111] mb-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b98158]" />
              Core Engineering Problem
            </h4>
            <p className="text-[#555555] font-sans leading-relaxed">{project.problem}</p>
          </div>

          <div>
            <h4 className="font-bold text-[11px] uppercase text-[#b98158] mb-2 border-b border-[#111111]/10 pb-1">
              System Architecture & Pipeline
            </h4>
            <ul className="space-y-1.5">
              {project.architecture.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#111111]">
                  <span className="text-[#b98158] font-bold">0{idx + 1}.</span>
                  <span className="font-sans text-[12.5px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[11px] uppercase text-[#111111] mb-2 border-b border-[#111111]/10 pb-1">
              Bottlenecks Solved
            </h4>
            <ul className="space-y-1.5">
              {project.bottlenecksSolved.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[#555555]">
                  <CheckCircle2 className="w-4 h-4 text-[#b98158] shrink-0 mt-0.5" />
                  <span className="font-sans text-[12.5px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#fdfbf7] border border-[#111111]/15 text-center shadow-sm">
                <span className="text-[9px] text-[#555555] font-bold uppercase block truncate mb-1">{m.label}</span>
                <span className="text-sm font-black text-[#111111] tracking-tighter">{m.value}</span>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-[10px] uppercase font-black text-[#555555] mb-2 tracking-widest">Technology Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded bg-[#ebebea] text-[#111111] border border-[#111111]/10 text-[10px] font-bold">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 bg-[#ebebea] border-t border-[#111111]/15 flex items-center justify-between font-mono text-xs">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#111111] hover:text-[#b98158] transition-colors font-bold group"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="border-b border-[#111111] group-hover:border-[#b98158]">Source Repository</span>
            </a>
          ) : (
            <span className="text-[#555555] font-bold italic">Internal NSUT Project</span>
          )}
          <button 
            onClick={onClose} 
            className="px-5 py-2 rounded-lg bg-[#111111] hover:bg-[#b98158] text-[#fdfbf7] font-bold transition-colors cursor-pointer shadow-[3px_3px_0px_rgba(185,129,88,0.4)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
