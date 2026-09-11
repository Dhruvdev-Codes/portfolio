"use client";

import { useEffect, useRef } from "react";

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const mouse = { x: -1000, y: -1000, active: false };

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

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
    const colors = ["#10b981", "#06b6d4", "#3b82f6", "#a855f7"];

    const init = () => {
      const isMobile = width < 768;
      const count = isMobile ? 25 : 50;
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.45),
          vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.45),
          radius: Math.random() * 1.5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.3,
        });
      }
    };

    init();
    const maxDist = 130;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        if (mouse.active) {
          const dx = mouse.x - n.x, dy = mouse.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 0) {
            const f = (1 - dist / 160) * 0.02;
            n.vx += (dx / dist) * f;
            n.vy += (dy / dist) * f;
          }
        }
        n.vx *= 0.99;
        n.vy *= 0.99;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = n.alpha;
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
            ctx.globalAlpha = (1 - d / maxDist) * 0.16;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        if (mouse.active) {
          const md = Math.hypot(mouse.x - nodes[i].x, mouse.y - nodes[i].y);
          if (md < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = "#10b981";
            ctx.globalAlpha = (1 - md / 160) * 0.25;
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
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Ambient gradient glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute top-[35%] right-[-5%] w-[550px] h-[550px] rounded-full bg-cyan-500/10 blur-[160px] animate-pulse [animation-duration:8s] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[150px] animate-pulse [animation-duration:10s] pointer-events-none" />

      {/* Cyberpunk dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #f4f4f5 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}
