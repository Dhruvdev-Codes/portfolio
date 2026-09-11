"use client";

import { useState, useMemo } from "react";
import { Cpu, RefreshCw, Zap } from "lucide-react";

export function EdgeAIShowcase() {
  const [alpha, setAlpha] = useState<number>(0.35);
  const [speed, setSpeed] = useState<number>(15);
  const [seed, setSeed] = useState<number>(1);

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

  return (
    <section id="simulations" className="py-16 md:py-24 border-t border-[#1e2738] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span>03 // CLIENT-SIDE SIMULATION LAB</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Interactive RSSI Signal Smoothing & Link Predictor
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-2 md:mt-0">r̂_t = α · r_t + (1 - α) · r̂_t-1</p>
        </div>

        <div className="bg-[#151c2a] border border-[#222e44] rounded-xl p-6 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-[#222e44] font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Alpha (α):</span>
                <span className="text-cyan-400 font-bold">{alpha.toFixed(2)}</span>
              </div>
              <input type="range" min="0.05" max="0.95" step="0.05" value={alpha} onChange={(e) => setAlpha(parseFloat(e.target.value))} className="w-full accent-cyan-400 cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Velocity:</span>
                <span className="text-teal-400 font-bold">{speed} m/s</span>
              </div>
              <input type="range" min="5" max="35" step="5" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} className="w-full accent-teal-400 cursor-pointer" />
            </div>

            <div className="flex items-center sm:justify-end">
              <button onClick={() => setSeed((s) => s + 1)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1a2334] border border-[#2d3d5a] hover:border-cyan-400 text-slate-200 hover:text-cyan-300 w-full sm:w-auto justify-center transition-all cursor-pointer">
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulate Signal</span>
              </button>
            </div>
          </div>

          <div className="py-4">
            <div className="flex justify-between text-xs font-mono mb-2">
              <div className="flex gap-4">
                <span className="text-slate-500">── Raw Noise</span>
                <span className="text-cyan-400 font-semibold">── Filtered r̂_t</span>
              </div>
              <span className="text-rose-400 text-[11px]">Cutoff: -85 dBm</span>
            </div>

            <div className="w-full h-36 bg-[#111722] rounded-lg border border-[#1f2a3e] p-2 overflow-hidden">
              <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full overflow-visible">
                <line x1="0" y1={getY(-85)} x2={w} y2={getY(-85)} stroke="#f43f5e" strokeDasharray="4 4" strokeWidth="1" opacity="0.7" />
                <path d={rawP} fill="none" stroke="#64748b" strokeWidth="1.5" strokeOpacity="0.4" />
                <path d={smP} fill="none" stroke="#22d3ee" strokeWidth="2.5" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#222e44] font-mono text-xs">
            <div className="p-3 rounded-lg bg-[#111722] border border-[#1f2a3e]">
              <span className="text-[10px] text-slate-400 block">Filtered Strength</span>
              <span className="text-sm font-bold text-cyan-300">{smoothedData[smoothedData.length - 1]} dBm</span>
            </div>
            <div className="p-3 rounded-lg bg-[#111722] border border-[#1f2a3e]">
              <span className="text-[10px] text-slate-400 block">Est. Link Lifetime</span>
              <span className="text-sm font-bold text-teal-300">~{letSec}s remaining</span>
            </div>
            <div className={`p-3 rounded-lg border flex items-center justify-between ${triggered ? "bg-rose-950/40 border-rose-500/50 text-rose-300" : "bg-cyan-950/40 border-cyan-500/40 text-cyan-300"}`}>
              <div>
                <span className="text-[10px] uppercase font-bold block">Protocol State</span>
                <span className="text-xs font-semibold">{triggered ? "Pre-Caching Alternative" : "Link Stable"}</span>
              </div>
              <Zap className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
