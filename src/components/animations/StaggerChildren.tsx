"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 0.1,
  initialDelay = 0,
}: StaggerChildrenProps) {
  const customVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={customVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
