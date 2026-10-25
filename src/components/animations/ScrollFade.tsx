"use client";

import { ReactNode, useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

const getVariants = (direction: string): Variants => {
  const distance = 60;
  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return {
    hidden: {
      opacity: 0,
      ...directionOffset[direction as keyof typeof directionOffset],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
};

export function ScrollFade({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
}: ScrollFadeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants(direction)}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
