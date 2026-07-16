"use client";

import React, { useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  baseAlpha: number;
}

export function Particles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return; // Respect reduced motion
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Keep existing density
      const numParticles = Math.min(Math.floor(window.innerWidth / 8), 150);
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15 - 0.05,
          baseSize: Math.random() * 1.5 + 0.5, // Smaller physical mote
          baseAlpha: Math.random() * 0.2 + 0.05, // Very faint in ambient space
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const lightX = canvas.width / 2;
      const lightY = -50; // Light source originates slightly above the viewport
      const maxDist = canvas.height * 1.2;

      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Calculate distance and angle from the light source
        const dx = p.x - lightX;
        const dy = p.y - lightY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Angle from straight down (Math.PI / 2)
        const angle = Math.atan2(dy, dx);
        const angleDeviation = Math.abs(angle - Math.PI / 2);

        // Volumetric Cone Physics (Smooth Falloff)
        // Use exponential decay based on angle to create a soft beam with no hard edges
        const beamSigma = 0.35; // Controls the width of the light cone
        const angleIntensity = Math.exp(-(angleDeviation * angleDeviation) / (2 * beamSigma * beamSigma));
        
        // Distance falloff (inverse linear)
        const distIntensity = Math.max(0, 1 - (distance / maxDist));
        
        // Total illumination (0 to 1)
        const illumination = angleIntensity * distIntensity;

        // Dynamic Atmospheric Appearance
        // 1. Brightness / Opacity: Pops out when illuminated, faint outside
        const finalAlpha = p.baseAlpha + (illumination * 0.85);
        
        // 2. Color Shift: Neutral cool interior dust -> Warm architectural gold
        const r = Math.floor(180 + (255 - 180) * illumination);
        const g = Math.floor(190 + (220 - 190) * illumination);
        const b = Math.floor(210 + (130 - 210) * illumination);

        // 3. Size/Bloom: Simulates light scattering on the particle in the beam
        const apparentSize = p.baseSize + (illumination * 1.8);

        ctx.beginPath();
        ctx.arc(p.x, p.y, apparentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha})`; 
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 ${className}`}
    />
  );
}
