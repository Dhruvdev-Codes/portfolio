"use client";

import { useState, useMemo, useEffect } from "react";
import { Cpu, RefreshCw, Zap, Play, Pause } from "lucide-react";

interface SimNode {
  id: number;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  role: "source" | "dest" | "hop";
}

export function EdgeAIShowcase() {
  const [activeTab, setActiveTab] = useState<"signal" | "topology">("signal");

  // Tab 1: Signal Smoothing state
  const [alpha, setAlpha] = useState<number>(0.35);
  const [speed, setSpeed] = useState<number>(15);
  const [seed, setSeed] = useState<number>(1);

  // Tab 2: Dynamic MANET Mesh state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [nodes, setNodes] = useState<SimNode[]>([
    { id: 1, label: "Src", x: 30, y: 80, vx: 0, vy: 0, role: "source" },
    { id: 2, label: "Node A", x: 120, y: 40, vx: 0.5, vy: 0.3, role: "hop" },
    { id: 3, label: "Node B", x: 130, y: 120, vx: -0.4, vy: 0.2, role: "hop" },
    { id: 4, label: "Node C", x: 230, y: 50, vx: 0.3, vy: -0.5, role: "hop" },
    { id: 5, label: "Node D", x: 240, y: 110, vx: -0.3, vy: 0.4, role: "hop" },
    { id: 6, label: "Dest", x: 330, y: 80, vx: 0, vy: 0, role: "dest" },
  ]);

  useEffect(() => {
    if (!isPlaying || activeTab !== "topology") return;
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((n) => {
          if (n.role === "source" || n.role === "dest") return n;
          let nx = n.x + n.vx;
          let ny = n.y + n.vy;
          let nvx = n.vx;
          let nvy = n.vy;
          if (nx < 70 || nx > 290) { nvx = -nvx; nx = Math.max(70, Math.min(290, nx)); }
          if (ny < 25 || ny > 135) { nvy = -nvy; ny = Math.max(25, Math.min(135, ny)); }
          return { ...n, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
    }, 40);
    return () => clearInterval(interval);
  }, [isPlaying, activeTab]);

  const { rawData, smoothedData, letSec, triggered } = useMemo(() => {
    const raw: number[] = [];
    const smoothed: number[] = [];
    let cur = -55;

    for (let t = 0; t < 25; t++) {
      const decay = t * speed * 0.15;
      const noise = Math.sin(t * 1.8 + seed) * 8;
      const v = Math.round(-50 - decay + noise);
      raw.push(v);
      cur = t === 0 ? v : alpha * v + (1 - alpha) * cur;
      smoothed.push(Math.round(cur * 10) / 10);
    }
    const last = smoothed[smoothed.length - 1];
    const letCalc = Math.max(0, Math.round((last - -85) / 1.5));
    return { rawData: raw, smoothedData: smoothed, letSec: letCalc, triggered: last < -78 };
  }, [alpha, speed, seed]);

  const w = 500;
  const h = 130;
  const getY = (v: number) => h - ((Math.max(-100, Math.min(-40, v)) - -100) / 60) * h;

  const rawP = rawData.map((v, i) => `${i === 0 ? "M" : "L"} ${(i / 24) * w} ${getY(v)}`).join(" ");
  const smP = smoothedData.map((v, i) => `${i === 0 ? "M" : "L"} ${(i / 24) * w} ${getY(v)}`).join(" ");

  const maxRange = 125;
  const links: { from: SimNode; to: SimNode; isDegrading: boolean }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (dist <= maxRange) links.push({ from: nodes[i], to: nodes[j], isDegrading: dist > 105 });
    }
  }

  const hasDegradingHop = links.some((l) => l.isDegrading);

  return (
    <section id="simulations" className="py-16 md:py-24 border-t border-slate-200 dark:border-[#1e2738] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-600 dark:text-cyan-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>03 // CLIENT-SIDE SIMULATION LAB</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Dynamic Signal Smoothing & Ad-Hoc Mesh Simulation
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0 font-mono text-xs">
            <button
              onClick={() => setActiveTab("signal")}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeTab === "signal"
                  ? "bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border-cyan-500/60 font-bold"
                  : "bg-white dark:bg-[#151c2a] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#222e44]"
              }`}
            >
              Signal Smoothing (EMA)
            </button>
            <button
              onClick={() => setActiveTab("topology")}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeTab === "topology"
                  ? "bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border-cyan-500/60 font-bold"
                  : "bg-white dark:bg-[#151c2a] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-[#222e44]"
              }`}
            >
              2D MANET Mesh Simulator
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-[#151c2a] border border-slate-200 dark:border-[#222e44] rounded-xl p-6 shadow-md dark:shadow-xl">
          {activeTab === "signal" ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-slate-200 dark:border-[#222e44] font-mono text-xs">
                <div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                    <span>Alpha (α):</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">{alpha.toFixed(2)}</span>
                  </div>
                  <input type="range" min="0.05" max="0.95" step="0.05" value={alpha} onChange={(e) => setAlpha(parseFloat(e.target.value))} className="w-full accent-cyan-500 dark:accent-cyan-400 cursor-pointer" />
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-1">
                    <span>Velocity:</span>
                    <span className="text-teal-600 dark:text-teal-400 font-bold">{speed} m/s</span>
                  </div>
                  <input type="range" min="5" max="35" step="5" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} className="w-full accent-teal-500 dark:accent-teal-400 cursor-pointer" />
                </div>

                <div className="flex items-center sm:justify-end">
                  <button onClick={() => setSeed((s) => s + 1)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-[#1a2334] border border-slate-200 dark:border-[#2d3d5a] hover:border-cyan-500 text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 w-full sm:w-auto justify-center transition-all cursor-pointer shadow-sm">
                    <RefreshCw className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>Simulate Signal</span>
                  </button>
                </div>
              </div>

              <div className="py-4">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <div className="flex gap-4">
                    <span className="text-slate-500">── Raw Noise</span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold">── Filtered r̂_t</span>
                  </div>
                  <span className="text-rose-500 dark:text-rose-400 text-[11px]">Cutoff: -78 dBm</span>
                </div>

                <div className="w-full h-36 bg-slate-50 dark:bg-[#111722] rounded-lg border border-slate-200 dark:border-[#1f2a3e] p-2 overflow-hidden">
                  <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full overflow-visible">
                    <line x1="0" y1={getY(-78)} x2={w} y2={getY(-78)} stroke="#f43f5e" strokeDasharray="4 4" strokeWidth="1" opacity="0.7" />
                    <path d={rawP} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeOpacity="0.5" />
                    <path d={smP} fill="none" stroke="#06b6d4" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-[#222e44] font-mono text-xs">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1f2a3e]">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Filtered Strength</span>
                  <span className="text-sm font-bold text-cyan-700 dark:text-cyan-300">{smoothedData[smoothedData.length - 1]} dBm</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1f2a3e]">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Est. Link Lifetime</span>
                  <span className="text-sm font-bold text-teal-600 dark:text-teal-300">~{letSec}s remaining</span>
                </div>
                <div className={`p-3 rounded-lg border flex items-center justify-between ${triggered ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-500/50 text-rose-700 dark:text-rose-300" : "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-500/40 text-cyan-700 dark:text-cyan-300"}`}>
                  <div>
                    <span className="text-[10px] uppercase font-bold block">Protocol State</span>
                    <span className="text-xs font-semibold">{triggered ? "Pre-Caching Alternative" : "Link Stable"}</span>
                  </div>
                  <Zap className="w-4 h-4" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#222e44] font-mono text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-slate-600 dark:text-slate-400">Dynamic Nodes: <strong className="text-cyan-600 dark:text-cyan-400">{nodes.length}</strong></span>
                  <span className="text-slate-600 dark:text-slate-400 hidden sm:inline">Active Links: <strong className="text-teal-600 dark:text-teal-400">{links.length}</strong></span>
                </div>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#1a2334] border border-slate-200 dark:border-[#2d3d5a] text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? "Pause Motion" : "Resume Motion"}</span>
                </button>
              </div>

              <div className="py-4">
                <div className="w-full h-44 bg-slate-900 rounded-lg border border-slate-800 p-2 relative overflow-hidden">
                  <svg viewBox="0 0 360 160" className="w-full h-full">
                    {links.map((link, idx) => (
                      <line
                        key={idx}
                        x1={link.from.x}
                        y1={link.from.y}
                        x2={link.to.x}
                        y2={link.to.y}
                        stroke={link.isDegrading ? "#f43f5e" : "#06b6d4"}
                        strokeWidth={link.isDegrading ? 1.2 : 1.8}
                        strokeDasharray={link.isDegrading ? "3 3" : "none"}
                        opacity={0.8}
                      />
                    ))}
                    {nodes.map((node) => {
                      const isSource = node.role === "source";
                      const isDest = node.role === "dest";
                      const fill = isSource ? "#10b981" : isDest ? "#38bdf8" : "#06b6d4";
                      return (
                        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                          <circle r={isSource || isDest ? 12 : 8} fill={fill} fillOpacity={0.25} stroke={fill} strokeWidth={1.5} />
                          <circle r={isSource || isDest ? 5 : 3.5} fill={fill} />
                          <text y={isSource || isDest ? -14 : -11} textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="monospace" fontWeight="bold">
                            {node.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-200 dark:border-[#222e44] font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1f2a3e]">
                  <span className="text-[10px] text-slate-500 block">Proactive LET Status</span>
                  <span className={`text-xs font-bold ${hasDegradingHop ? "text-amber-500" : "text-teal-600 dark:text-teal-400"}`}>
                    {hasDegradingHop ? "⚠️ Hop Distance > 105m — LET Pre-Caching Triggered" : "✓ All Ad-Hoc Paths Nominal & Optimal"}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#111722] border border-slate-200 dark:border-[#1f2a3e]">
                  <span className="text-[10px] text-slate-500 block">Routing Strategy</span>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                    Proactive Graph Pre-Caching (Zero Dropped Packets)
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
