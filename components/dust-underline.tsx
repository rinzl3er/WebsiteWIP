"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface DustUnderlineProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  idleCount?: number;
}

interface ParticleData {
  id: number;
  idleX: number;
  idleY: number;
  targetX: number;
  targetY: number;
  size: number;
  floatDurationX: number;
  floatDurationY: number;
  floatOffsetX: number;
  floatOffsetY: number;
  delay: number;
  idleOpacity: number;
  hoverOpacity: number;
}

export function DustUnderline({
  children,
  className = "",
  particleCount = 25,
  idleCount = 8,
}: DustUnderlineProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particles = useMemo(() => {
    const arr: ParticleData[] = [];
    const sag = 20; // curve sag amount in %
    
    for (let i = 0; i < particleCount; i++) {
      const t = i / (particleCount - 1); 
      const targetX = t * 100;
      
      // Parabolic curve for the underline (dips slightly in the middle)
      const curve = 4 * t * (1 - t); 
      const targetY = 80 + curve * sag; 

      // Only the first few particles are visible when idle
      const isIdleVisible = i < idleCount;

      arr.push({
        id: i,
        // Idle positions scatter loosely around the underline region
        idleX: 10 + Math.random() * 80,
        idleY: 60 + Math.random() * 40,
        targetX,
        targetY,
        size: Math.random() * 1.2 + 0.8, // Slightly larger base size for visibility
        floatDurationX: Math.random() * 3 + 3,
        floatDurationY: Math.random() * 3 + 3,
        floatOffsetX: (Math.random() - 0.5) * 15,
        floatOffsetY: (Math.random() - 0.5) * 15,
        delay: Math.random() * 0.15,
        idleOpacity: isIdleVisible ? Math.random() * 0.4 + 0.2 : 0,
        hoverOpacity: Math.random() * 0.4 + 0.4,
      });
    }
    return arr;
  }, [particleCount, idleCount]);

  if (shouldReduceMotion) {
    return (
      <span className={`relative inline-block ${className}`}>
        {children}
        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-current opacity-40 transition-opacity duration-300 hover:opacity-100" />
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Invisible padded area to give the particles room to float around the text without clipping */}
      <span className="relative z-10">
        {children}
      </span>
      
      {isMounted && (
        <svg
          className="pointer-events-none absolute left-[-10%] top-[-10%] h-[150%] w-[120%] overflow-visible text-current"
          style={{ zIndex: -1 }}
        >
          {particles.map((p) => {
            return (
              <motion.circle
                key={p.id}
                r={p.size}
                fill="currentColor" // Matches the white foreground color perfectly without hardcoding
                initial={false}
                animate={{
                  // cx/cy handle the structural layout positioning
                  cx: `${isHovered ? p.targetX : p.idleX}%`,
                  cy: `${isHovered ? p.targetY : p.idleY}%`,
                  // x/y handle the gentle breathing float
                  x: isHovered ? p.floatOffsetX * 0.15 : p.floatOffsetX,
                  y: isHovered ? p.floatOffsetY * 0.15 : p.floatOffsetY,
                  opacity: isHovered ? p.hoverOpacity : p.idleOpacity,
                }}
                transition={{
                  // Smooth spring physics for layout transitions
                  cx: { type: "spring", stiffness: 45, damping: 14, mass: 0.8, delay: isHovered ? p.delay : 0 },
                  cy: { type: "spring", stiffness: 45, damping: 14, mass: 0.8, delay: isHovered ? p.delay : 0 },
                  opacity: { duration: 0.5, ease: "easeInOut" },
                  // Infinite gentle oscillation for organic dust floating
                  x: { duration: p.floatDurationX, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                  y: { duration: p.floatDurationY, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
                }}
              />
            );
          })}
        </svg>
      )}
    </span>
  );
}
