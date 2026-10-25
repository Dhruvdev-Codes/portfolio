"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
  size: number;
}

interface PerspectiveTunnelProps {
  particleCount?: number;
  tunnelSpeed?: number;
  tunnelDepth?: number;
}

export function PerspectiveTunnel({
  particleCount = 120,
  tunnelSpeed = 2.5,
  tunnelDepth = 800,
}: PerspectiveTunnelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const colors = ["#06b6d4", "#14b8a6", "#22d3ee", "#2dd4bf", "#38bdf8"];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: (Math.random() - 0.5) * canvas.width * 1.5,
          y: (Math.random() - 0.5) * canvas.height * 1.5,
          z: Math.random() * tunnelDepth,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          vz: Math.random() * tunnelSpeed + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2 + 1,
        });
      }
    };

    const isDark = () => document.documentElement.classList.contains("dark");

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const dark = isDark();
      
      // Sort particles by z for proper depth rendering
      particles.sort((a, b) => b.z - a.z);

      for (const p of particles) {
        // Update particle position
        p.z -= p.vz;
        
        // Reset particle when it passes camera
        if (p.z <= 0) {
          p.z = tunnelDepth;
          p.x = (Math.random() - 0.5) * canvas.width * 1.5;
          p.y = (Math.random() - 0.5) * canvas.height * 1.5;
        }

        // Calculate perspective projection
        const scale = tunnelDepth / (tunnelDepth - p.z);
        const screenX = centerX + p.x * scale;
        const screenY = centerY + p.y * scale;

        // Skip if outside viewport
        if (screenX < -50 || screenX > canvas.width + 50 || 
            screenY < -50 || screenY > canvas.height + 50) {
          continue;
        }

        // Calculate alpha based on depth (fade in distance)
        const alpha = Math.max(0, Math.min(1, 1 - p.z / tunnelDepth));
        
        // Draw particle with glow
        const particleSize = p.size * scale;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(
          screenX, screenY, 0,
          screenX, screenY, particleSize * 3
        );
        
        const baseColor = dark ? p.color : p.color + "99";
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(0.4, p.color + "40");
        gradient.addColorStop(1, "transparent");
        
        ctx.beginPath();
        ctx.arc(screenX, screenY, particleSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = alpha * (dark ? 0.8 : 0.6);
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(screenX, screenY, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = dark ? "#fff" : "#fff";
        ctx.globalAlpha = alpha * 0.9;
        ctx.fill();

        // Draw trail effect
        if (p.z < tunnelDepth * 0.3) {
          ctx.beginPath();
          const trailLength = 30 * scale;
          ctx.moveTo(screenX, screenY);
          ctx.lineTo(screenX + p.vx * trailLength * 10, screenY + p.vy * trailLength * 10);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = alpha * 0.3;
          ctx.lineWidth = particleSize * 0.5;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(render);
    };

    resize();
    initParticles();
    render();

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    // Add dynamic color response to theme changes
    const observer = new MutationObserver(() => {
      initParticles();
    });
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ["class"] 
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [particleCount, tunnelSpeed, tunnelDepth]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}