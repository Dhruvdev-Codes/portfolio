"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glareEnabled?: boolean;
}

export function TiltCard({
  children,
  className = "",
  tiltStrength = 15,
  glareEnabled = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [0, 1], [tiltStrength, -tiltStrength]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltStrength, tiltStrength]), springConfig);

  const glareX = useSpring(useTransform(x, [0, 1], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [0, 1], [0, 100]), springConfig);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([latestX, latestY]) =>
      `radial-gradient(circle at ${latestX}% ${latestY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {/* Glare Effect */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
          style={{
            background: glareBackground,
          }}
        />
      )}
      
      {/* Content with slight depth */}
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}
