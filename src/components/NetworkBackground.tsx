"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    const pointer = { x: -1000, y: -1000, active: false };

    const updateSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      init();
    };

    const onMouseMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const onMouseLeave = () => {
      pointer.active = false;
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
        pointer.active = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
        pointer.active = true;
      }
    };

    const onTouchEnd = () => {
      pointer.active = false;
      pointer.x = -1000;
      pointer.y = -1000;
    };

    window.addEventListener("resize", updateSize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }

    let nodes: Node[] = [];

    const init = () => {
      const isMobile = width < 768;
      const count = isMobile ? 28 : 55;
      const isDark = document.documentElement.classList.contains("dark");
      const darkColors = ["#06b6d4", "#14b8a6", "#38bdf8", "#22d3ee"];
      const lightColors = ["#0284c7", "#0d9488", "#0369a1", "#0f766e"];
      const activeColors = isDark ? darkColors : lightColors;

      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.5),
          vy: (Math.random() - 0.5) * (isMobile ? 0.35 : 0.5),
          radius: Math.random() * 1.5 + (isMobile ? 1.2 : 1),
          color: activeColors[Math.floor(Math.random() * activeColors.length)],
          alpha: Math.random() * 0.4 + 0.3,
        });
      }
    };

    updateSize();

    const maxDist = 135;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        if (pointer.active) {
          const dx = pointer.x - n.x, dy = pointer.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 0) {
            const f = (1 - dist / 160) * 0.025;
            n.vx += (dx / dist) * f;
            n.vy += (dy / dist) * f;
          }
        }
        n.vx *= 0.99;
        n.vy *= 0.99;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = isDark ? n.alpha : n.alpha * 0.7;
        ctx.fill();
      }

      // Draw mesh links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = nodes[i].color;
            ctx.globalAlpha = (1 - d / maxDist) * (isDark ? 0.22 : 0.18);
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        if (pointer.active) {
          const md = Math.hypot(pointer.x - nodes[i].x, pointer.y - nodes[i].y);
          if (md < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = isDark ? "#06b6d4" : "#0284c7";
            ctx.globalAlpha = (1 - md / 150) * (isDark ? 0.35 : 0.28);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(animId);
    };
  }, [resolvedTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-slate-50 dark:bg-[#12161f] transition-colors duration-200">
      {/* Ambient gradient glowing orbs with teal & cyan accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] rounded-full bg-teal-500/5 dark:bg-teal-500/10 blur-[100px] sm:blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute top-[35%] right-[-5%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-cyan-500/8 dark:bg-cyan-500/12 blur-[120px] sm:blur-[160px] animate-pulse [animation-duration:8s] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[380px] sm:w-[600px] h-[380px] sm:h-[600px] rounded-full bg-sky-600/6 dark:bg-sky-600/10 blur-[110px] sm:blur-[150px] animate-pulse [animation-duration:10s] pointer-events-none" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}

