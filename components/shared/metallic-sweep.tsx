"use client";

import React from "react";
import { useReducedMotion } from "framer-motion";

export function MetallicSweep({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={`metallic-sweep inline-block cursor-default ${className}`}>
      {children}
    </span>
  );
}
