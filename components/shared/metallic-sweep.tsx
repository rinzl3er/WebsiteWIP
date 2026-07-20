"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function MetallicSweep({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base layer - normal text */}
      <span className="relative z-0 text-current">{children}</span>

      {/* Sweep animation overlay */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 select-none"
        initial={{ opacity: 0, backgroundPosition: "200% center" }}
        animate={{
          opacity: isHovered ? 1 : 0,
          backgroundPosition: isHovered ? "-100% center" : "200% center",
        }}
        transition={{
          // Sweep across when hovered, snap back instantly when unhovered
          backgroundPosition: isHovered 
            ? { duration: 1.6, ease: "easeInOut" } 
            : { duration: 0 },
          opacity: { duration: 0.3 }
        }}
        style={{
          // Extra padding ensures background-clip doesn't cut off descenders like 'y'
          paddingBottom: "0.4em",
          paddingRight: "0.2em",
          // Grey metallic shine: transparent -> dark grey -> bright white -> dark grey -> transparent
          backgroundImage: "linear-gradient(110deg, transparent 0%, rgba(200,200,210,0.3) 40%, #ffffff 50%, rgba(200,200,210,0.3) 60%, transparent 100%)",
          backgroundSize: "200% 100%",
          backgroundRepeat: "no-repeat",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          // The requested halo/bloom effect that physically travels with the white core
          filter: "drop-shadow(0 0 12px rgba(255,255,255,0.8)) drop-shadow(0 0 24px rgba(255,255,255,0.4))",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
