"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { revealProps } from "@/lib/motion";

const showcaseProjects = [
  {
    filename: "Poddar House, Mumbai A.jpg",
    venue: "Poddar House",
    location: "Mumbai"
  },
  {
    filename: "Mansion, Agra A.jpg",
    venue: "Mansion",
    location: "Agra"
  },
  {
    filename: "TeryTree, Siliguri A.jpg",
    venue: "TeryTree",
    location: "Siliguri"
  },
  {
    filename: "Playboy Club Mumbai B.jpg",
    venue: "Playboy Club",
    location: "Mumbai"
  },
  {
    filename: "Clava, Jabalpur A.jpeg",
    venue: "Clava",
    location: "Jabalpur"
  }
];

export function SelectedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === showcaseProjects.length - 1 ? 0 : prev + 1));
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? showcaseProjects.length - 1 : prev - 1));
  };

  const currentProject = showcaseProjects[currentIndex];

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <motion.div {...revealProps} className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              SELECTED PROJECTS
            </span>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              A Selection of <span className="text-primary">Our Work</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="font-mono text-sm tracking-widest text-muted-foreground">
              {String(currentIndex + 1).padStart(2, "0")} / {String(showcaseProjects.length).padStart(2, "0")}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={prevProject}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background hover:border-primary transition-colors hover:text-primary z-10"
                aria-label="Previous project"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextProject}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background hover:border-primary transition-colors hover:text-primary z-10"
                aria-label="Next project"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="relative aspect-[4/5] md:aspect-[21/9] w-full overflow-hidden rounded-2xl bg-ink-soft">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={`/site-images/${currentProject.filename}`}
                alt={`${currentProject.venue} - ${currentProject.location}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1280px"
                priority={currentIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full pointer-events-none">
                <h3 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
                  {currentProject.venue}
                </h3>
                <p className="mt-2 text-sm md:text-base text-white/80 font-medium tracking-wide drop-shadow-md uppercase">
                  📍 {currentProject.location}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
