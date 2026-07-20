"use client";

import { motion, type Variants } from "framer-motion";

export function RoomShapeIllustration({ shape }: { shape: string }) {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.1, duration: 1.5, ease: "easeInOut" },
        opacity: { delay: 0.1, duration: 0.5 }
      }
    }
  };

  if (shape === "Standard Room") {
    return (
      <div className="relative w-full max-w-[240px] aspect-square">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary fill-none stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
          <motion.rect width="60" height="40" x="20" y="40" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M20,40 L40,20 L100,20 L80,40 Z" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M100,20 L100,60 L80,80" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M40,20 L40,60 L20,80" className="stroke-primary/30 stroke-[1]" strokeDasharray="4 4" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M40,60 L100,60" className="stroke-primary/30 stroke-[1]" strokeDasharray="4 4" variants={draw} initial="hidden" animate="visible" />
        </svg>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-mono text-muted-foreground/80 bg-ink-soft/80 px-1 rounded">W</div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[11px] font-mono text-muted-foreground/80 bg-ink-soft/80 px-1 rounded">H</div>
        <div className="absolute bottom-8 right-12 text-[11px] font-mono text-muted-foreground/80 bg-ink-soft/80 px-1 rounded">L</div>
      </div>
    );
  }

  if (shape === "Sloped Ceiling") {
    return (
      <div className="relative w-full max-w-[240px] aspect-square">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary fill-none stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
          <motion.path d="M20,50 L20,80 L80,80 L80,30 Z" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M20,50 L40,30 L100,10 L80,30 Z" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M100,10 L100,60 L80,80" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M40,30 L40,60 L20,80" className="stroke-primary/30 stroke-[1]" strokeDasharray="4 4" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M40,60 L100,60" className="stroke-primary/30 stroke-[1]" strokeDasharray="4 4" variants={draw} initial="hidden" animate="visible" />
        </svg>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-mono text-muted-foreground/80 bg-ink-soft/80 px-1 rounded">W</div>
        <div className="absolute left-6 top-[65%] -translate-y-1/2 text-[11px] font-mono text-muted-foreground/80 bg-ink-soft/80 px-1 rounded">H1</div>
        <div className="absolute right-4 top-[55%] -translate-y-1/2 text-[11px] font-mono text-muted-foreground/80 bg-ink-soft/80 px-1 rounded">H2</div>
        <div className="absolute bottom-8 right-12 text-[11px] font-mono text-muted-foreground/80 bg-ink-soft/80 px-1 rounded">L</div>
      </div>
    );
  }

  if (shape === "Vaulted Ceiling") {
    return (
      <div className="relative w-full max-w-[240px] aspect-square">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary fill-none stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round">
          <motion.path d="M20,50 L50,30 L80,50 L80,80 L20,80 Z" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M50,30 L70,10 L100,30 L80,50 Z" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M20,50 L40,30 L70,10" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M100,30 L100,60 L80,80" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M40,30 L40,60 L20,80" className="stroke-primary/30 stroke-[1]" strokeDasharray="4 4" variants={draw} initial="hidden" animate="visible" />
          <motion.path d="M40,60 L100,60" className="stroke-primary/30 stroke-[1]" strokeDasharray="4 4" variants={draw} initial="hidden" animate="visible" />
        </svg>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-mono text-muted-foreground/80 bg-ink-soft/80 px-1 rounded">W</div>
        <div className="absolute left-4 top-[65%] -translate-y-1/2 text-[11px] font-mono text-muted-foreground/80 bg-ink-soft/80 px-1 rounded">H1</div>
        <div className="absolute left-[48%] top-[25%] -translate-y-1/2 -translate-x-1/2 text-[11px] font-mono text-muted-foreground/80 bg-ink-soft/80 px-1 rounded">H2</div>
        <div className="absolute bottom-8 right-12 text-[11px] font-mono text-muted-foreground/80 bg-ink-soft/80 px-1 rounded">L</div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[240px] aspect-square flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-24 h-24 border border-primary/20 border-dashed rounded-full flex items-center justify-center"
      >
        <div className="w-12 h-12 border border-primary/40 border-dashed rounded-full" />
      </motion.div>
    </div>
  );
}
