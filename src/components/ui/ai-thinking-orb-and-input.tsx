"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, RefreshCcw, Sparkles, Search, Brain, Cpu, MessageSquare, CheckCircle2 } from "lucide-react";

type Phase = "idle" | "thinking" | "searching" | "analyzing" | "composing" | "done";

interface MorphOrbProps {
  onSubmit: (query: string) => Promise<string>;
}

const COPY = {
  placeholder: "Ask Dhruv's AI Agent…",
  labels: {
    thinking: "Thinking",
    searching: "Searching",
    analyzing: "Analyzing",
    composing: "Composing",
  },
  done: "Done",
  answerTitle: "Answer",
  reset: "New question",
  send: "Send",
};

class Dot {
  x: number = 0;
  y: number = 0;
  z: number = 0;
  px: number = 0;
  py: number = 0;
  size: number = 2;
  color: string = "#b98158";
  
  constructor(index: number, total: number) {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    this.x = Math.cos(theta) * Math.sin(phi);
    this.y = Math.sin(theta) * Math.sin(phi);
    this.z = Math.cos(phi);
  }

  project(width: number, height: number, rotationX: number, rotationY: number, scale: number) {
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);

    const y1 = this.y * cosX - this.z * sinX;
    const z1 = this.z * cosX + this.y * sinX;
    const x2 = this.x * cosY - z1 * sinY;
    const z2 = z1 * cosY + this.x * sinY;

    const p = 400 / (400 + z2);
    this.px = width / 2 + x2 * p * scale;
    this.py = height / 2 + y1 * p * scale;
    this.size = (z2 + 1.5) * 1.2;
  }

  draw(ctx: CanvasRenderingContext2D, opacity: number) {
    ctx.beginPath();
    ctx.arc(this.px, this.py, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(185, 129, 88, ${opacity * (this.size / 3)})`;
    ctx.fill();
  }
}
export default function MorphOrb({ onSubmit }: MorphOrbProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotation = useRef({ x: 0, y: 0 });
  const frameId = useRef<number>();
  const dots = useRef<Dot[]>([]);

  useEffect(() => {
    dots.current = Array.from({ length: 120 }, (_, i) => new Dot(i, 120));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const speed = phase === "idle" ? 0.005 : phase === "done" ? 0.002 : 0.04;
      const scale = phase === "idle" ? 40 : phase === "done" ? 30 : 50;
      const opacity = phase === "idle" ? 0.4 : 1;

      rotation.current.x += speed;
      rotation.current.y += speed * 0.8;

      dots.current.forEach(dot => {
        dot.project(canvas.width, canvas.height, rotation.current.x, rotation.current.y, scale);
        dot.draw(ctx, opacity);
      });

      frameId.current = requestAnimationFrame(render);
    };

    frameId.current = requestAnimationFrame(render);
    return () => {
      if (frameId.current) cancelAnimationFrame(frameId.current);
    };
  }, [phase]);

  const handleRun = async () => {
    if (!query.trim() || phase !== "idle") return;
    
    setError("");
    setPhase("thinking");
    
    const steps: Phase[] = ["searching", "analyzing", "composing"];
    for (const step of steps) {
      await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
      setPhase(step);
    }

    try {
      const res = await onSubmit(query);
      setAnswer(res);
      setPhase("done");
    } catch {
      setError("Routing error. Please try again.");
      setPhase("idle");
    }
  };

  const handleReset = () => {
    setPhase("idle");
    setQuery("");
    setAnswer("");
    setError("");
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 flex justify-center">
      <motion.div 
        drag
        dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
        whileDrag={{ scale: 1.02 }}
        layout
        className="relative bg-[#fdfbf7] border border-[#111111]/15 rounded-2xl shadow-[12px_12px_0px_rgba(17,17,17,0.1)] p-6 overflow-hidden cursor-grab active:cursor-grabbing w-full"
      >
        <div className="absolute right-[-20px] top-[-20px] pointer-events-none opacity-80">
          <canvas 
            ref={canvasRef} 
            width={160} 
            height={160} 
            className="w-40 h-40"
          />
        </div>

        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {phase === "idle" ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-[#b98158]/10 p-2 rounded-lg">
                    <Sparkles className="w-5 h-5 text-[#b98158]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#111111] font-mono">AI AGENT</h3>
                    <p className="text-[10px] text-[#555555] font-bold">Multi-tier AI Research Intelligence</p>
                  </div>
                </div>

                <div className="p-[1px] bg-gradient-to-r from-[#b98158] via-[#e63946] to-[#b98158] rounded-xl shadow-sm">
                  <div className="flex gap-2 bg-[#fdfbf7] p-1 rounded-xl">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleRun()}
                      placeholder={COPY.placeholder}
                      className="flex-1 bg-[#ebebea] border border-[#111111]/10 rounded-lg px-4 py-3 text-sm text-[#111111] focus:outline-none focus:border-[#b98158] font-sans transition-colors"
                    />
                    <button
                      onClick={handleRun}
                      disabled={!query.trim()}
                      className="bg-[#111111] text-[#fdfbf7] p-3 rounded-lg hover:bg-[#b98158] transition-colors disabled:opacity-30 cursor-pointer shadow-[2px_2px_0px_rgba(185,129,88,0.3)]"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) :
              phase === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center border-b border-[#111111]/10 pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#b98158]" />
                    <span className="text-[10px] font-bold uppercase font-mono text-[#555555]">Response Synthesized</span>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="text-[10px] font-bold uppercase font-mono text-[#b98158] hover:underline flex items-center gap-1"
                  >
                    <RefreshCcw className="w-3 h-3" /> {COPY.reset}
                  </button>
                </div>
                
                <div className="bg-[#ebebea] rounded-xl p-4 border border-[#111111]/5 max-h-[200px] overflow-y-auto">
                  <p className="text-sm leading-relaxed text-[#111111] whitespace-pre-wrap">{answer}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-6 flex flex-col items-center justify-center space-y-6"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#b98158]/30 animate-[spin_8s_linear_infinite]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {phase === "thinking" && <Brain className="w-6 h-6 text-[#b98158] animate-pulse" />}
                    {phase === "searching" && <Search className="w-6 h-6 text-[#b98158] animate-pulse" />}
                    {phase === "analyzing" && <Cpu className="w-6 h-6 text-[#b98158] animate-pulse" />}
                    {phase === "composing" && <MessageSquare className="w-6 h-6 text-[#b98158] animate-pulse" />}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold font-mono text-[#111111] flex items-center justify-center gap-2">
                    <span className="animate-pulse">{COPY.labels[phase as keyof typeof COPY.labels]}</span>
                    <span className="flex gap-1">
                      <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: "200ms" }}>.</span>
                      <span className="animate-bounce" style={{ animationDelay: "400ms" }}>.</span>
                    </span>
                  </div>
                  <p className="text-[10px] uppercase font-bold text-[#555555] tracking-tighter mt-1 opacity-60">OmniRoute Processing...</p>
                </div>

                <div className="w-full max-w-[200px] bg-[#111111]/5 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-full bg-[#b98158]"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <p className="mt-4 text-xs font-bold text-red-600 bg-red-50 p-2 rounded border border-red-100 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            {error}
          </p>
        )}
      </motion.div>
    </div>
  );
}


