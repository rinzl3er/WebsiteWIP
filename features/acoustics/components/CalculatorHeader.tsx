"use client";

import { motion } from "framer-motion";

export function CalculatorHeader() {
  return (
    <div className="space-y-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
      >
        Acoustic Design Calculator
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl"
      >
        Analyze room acoustics using industry-standard reverberation calculations.
      </motion.p>
    </div>
  );
}
