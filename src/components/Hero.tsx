"use client";

import { Layers, BookOpen, Mail, Shield, Sparkles, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { GithubIcon } from "@/components/GithubIcon";
import { PROFILE_DATA } from "@/data/profile";
import { PerspectiveTunnel, MagneticButton, StaggerChildren, itemVariants } from "@/components/animations";

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResume?: () => void;
}

export function Hero({ onOpenTerminal, onOpenResume }: HeroProps) {
  return (
    <section id="about" className="relative pt-32 pb-16 md:pt-38 md:pb-20 overflow-hidden">
      {/* 3D Perspective Tunnel Background */}
      <div className="absolute inset-0 pointer-events-none">
        <PerspectiveTunnel particleCount={100} tunnelSpeed={2} tunnelDepth={1000} />
      </div>

      {/* Background Accent Glows (Teal / Cyan) with animation */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[450px] h-[280px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <StaggerChildren staggerDelay={0.15} initialDelay={0.2}>
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#182030] border border-slate-200 dark:border-cyan-500/30 text-xs font-mono text-slate-700 dark:text-slate-300 mb-6 shadow-sm">
              <motion.span
                className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-slate-500 dark:text-slate-400">Scholar:</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{PROFILE_DATA.institution}</span>
            </motion.div>

            {/* Clean, Large Bold Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight font-sans"
            >
              {PROFILE_DATA.name}
            </motion.h1>

            {/* Subtitle with animated gradient */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 tracking-tight font-sans"
            >
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-sky-600 dark:from-cyan-400 dark:via-teal-300 dark:to-sky-400"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Software Developer | Cyber Security Engineer
              </motion.span>
            </motion.h2>

            {/* Specialty Tags with stagger */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
              {["Ad-Hoc Wireless Link Predictability", "Distributed Cloud Architecture", "AEAD Network Cryptography"].map((tag, idx) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-2.5 py-1 rounded-md bg-white dark:bg-[#161d2b] border border-slate-200 dark:border-[#222e44] text-slate-700 dark:text-slate-300 shadow-sm cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Action CTAs with Magnetic Effect */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 font-mono text-xs sm:text-sm">
              <MagneticButton href="#projects" magneticStrength={0.25}>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 dark:from-cyan-500 dark:to-teal-500 hover:from-cyan-500 hover:to-teal-500 text-white dark:text-slate-950 font-bold transition-all shadow-md shadow-cyan-900/20 hover:shadow-cyan-900/40 cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>Explore Projects</span>
                </motion.a>
              </MagneticButton>

              {onOpenResume && (
                <MagneticButton onClick={onOpenResume} magneticStrength={0.2}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-[#182030] hover:bg-slate-100 dark:hover:bg-[#1e273a] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#26354d] hover:border-cyan-500/60 transition-all shadow-sm cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span>View CV / Resume</span>
                  </motion.button>
                </MagneticButton>
              )}

              <MagneticButton href="#research" magneticStrength={0.2}>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-[#182030] hover:bg-slate-100 dark:hover:bg-[#1e273a] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#26354d] hover:border-cyan-500/60 transition-all shadow-sm"
                >
                  <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Research Framework</span>
                </motion.a>
              </MagneticButton>

              <MagneticButton onClick={onOpenTerminal} magneticStrength={0.25}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white dark:bg-[#182030] hover:bg-slate-100 dark:hover:bg-[#1e273a] text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer group shadow-sm"
                >
                  <motion.div
                    animate={{ rotate: [0, 12, -12, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </motion.div>
                  <span>Ask AI Agent</span>
                </motion.button>
              </MagneticButton>
            </motion.div>

            {/* Social & Contact Bar */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-10 text-xs font-mono text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-[#1e2738]/60">
              <span className="text-slate-400 dark:text-slate-500">Connect:</span>
              <motion.a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <Shield className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>LinkedIn</span>
              </motion.a>
              <motion.a
                href={`mailto:${PROFILE_DATA.email}`}
                whileHover={{ scale: 1.1, y: -2 }}
                className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{PROFILE_DATA.email}</span>
              </motion.a>
            </motion.div>

            {/* Metrics Display with stagger animation */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              {PROFILE_DATA.metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-3.5 rounded-lg bg-white/90 dark:bg-[#161d2b]/80 border border-slate-200 dark:border-[#222e44] backdrop-blur-sm hover:border-cyan-500/40 transition-colors shadow-sm cursor-default"
                >
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mb-1">{metric.label}</div>
                  <div className="text-sm font-bold text-cyan-700 dark:text-cyan-300 truncate">{metric.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

