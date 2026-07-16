"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  MonitorPlay,
  Volume2,
} from "lucide-react";

import { SiteLayout } from "@/components/site-layout";
import { TrustedBy } from "@/components/trusted-by";
import { SelectedProjects } from "@/components/selected-projects";
import {
  revealProps,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

const heroImage = "/assets/hero.jpg";

const services = [
  {
    icon: Volume2,
    title: "Acoustics",
    tag: "When sound matters",
    desc:
      "Room acoustics, sound isolation and noise control from home theatres to auditoriums, studios and worship spaces.",
    overview:
      "We design acoustic environments that enhance clarity, comfort and performance. Whether it is a home theatre, auditorium, recording studio, worship space or commercial facility, every solution is engineered to deliver balanced sound, effective noise control and seamless architectural integration.",
  },
  {
    icon: Lightbulb,
    title: "Lighting",
    tag: "When light matters",
    desc:
      "Architectural, decorative and pixel-mapped LED lighting powered by MADRIX.",
    overview:
      "Lighting shapes emotion, architecture and atmosphere. We create intelligent lighting systems that combine aesthetics with functionality.",
  },
  {
    icon: MonitorPlay,
    title: "Audio Visual",
    tag: "When AV matters",
    desc:
      "Projection, displays, distributed audio and complete AV integration.",
    overview:
      "Professional AV systems designed for reliability, ease of operation and outstanding presentation quality.",
  },
];

type Service = (typeof services)[number];

function ServiceCard({
  service,
  expanded,
  anyExpanded,
  onToggle,
}: {
  service: Service;
  expanded: boolean;
  anyExpanded: boolean;
  onToggle: () => void;
}) {
  const { icon: Icon, title, tag, desc, overview } = service;

  return (
    <motion.article
      {...staggerItem}
      layout
      onClick={!expanded ? onToggle : undefined}
      className={`relative overflow-hidden border bg-ink-soft transition-all duration-500 cursor-pointer ${expanded
        ? "rounded-3xl border-primary p-8 lg:flex-[3]"
        : anyExpanded
          ? "hidden lg:hidden"
          : "rounded-2xl border-border p-6 hover:border-primary flex-1"
        }`}
    >
      {expanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-border hover:border-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
      )}

      {!expanded && (
        <div className="absolute right-5 top-5 h-2 w-2 rounded-full bg-primary opacity-0 group-hover:opacity-100" />
      )}

      <div
        className={`flex ${expanded
          ? "flex-col lg:flex-row gap-10"
          : "flex-col"
          }`}
      >
        <div
          className={`${expanded
            ? "lg:w-1/3 lg:pl-12"
            : "w-full"
            }`}
        >
          <Icon
            className="h-9 w-9 text-primary"
            strokeWidth={1.5}
          />

          <h3 className="mt-6 text-3xl font-bold">
            {title}
          </h3>

          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            {tag}
          </p>

          <p className="mt-5 leading-relaxed text-muted-foreground">
            {desc}
          </p>
        </div>

        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:w-2/3"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
              Overview
            </p>

            <p className="mt-4 leading-8 text-muted-foreground">
              {overview}
            </p>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}

const bgImages = [
  { src: "/Site images/Yellow Lights School for Performing Arts, Thane A.jpg", alt: "Large Auditorium" },
  { src: "/assets/home_theatre.png", alt: "Home Theatre" },
  { src: "/assets/recording_studio.png", alt: "Recording Studio" },
  { src: "/Site images/Poddar House, Mumbai C.jpg", alt: "Luxury Residence" },
  { src: "/Site images/Playboy Club Mumbai A.jpg", alt: "Hospitality Club" }
];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return prefersReducedMotion;
}

export default function Home() {
  const [expandedService, setExpandedService] =
    useState<string | null>(null);

  const ctaSectionRef = useRef<HTMLDivElement>(null);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [currentCtaIndex, setCurrentCtaIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCtaVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (ctaSectionRef.current) {
      observer.observe(ctaSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isCtaVisible || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentCtaIndex((prev) => (prev + 1) % bgImages.length);
    }, 9000);

    return () => clearInterval(interval);
  }, [isCtaVisible, prefersReducedMotion]);

  return (
    <SiteLayout>
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">

          <Image
            src={heroImage}
            alt="Hero"
            fill
            priority
            className="object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />

          <div className="grid-lines absolute inset-0 opacity-40" />

        </div>

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">

          <div className="max-w-5xl">

            <motion.div
              {...revealProps}
              className="flex items-center gap-3"
            >
              <span className="h-px w-12 bg-primary" />

              <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">
                DESIGN • CONSULTANCY • EXECUTION
              </span>
            </motion.div>

            <motion.h1
              {...revealProps}
              className="mt-8 text-5xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-[8rem]"
            >
              Acoustics.
              <br />

              <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Lighting.
              </span>

              <br />

              <span className="text-primary">
                Audio Visual.
              </span>
            </motion.h1>

            <motion.p
              {...revealProps}
              className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground"
            >
              We shape how spaces are seen, heard and experienced.
              Acoustics, light and sound considered together,
              from design through execution.
            </motion.p>

            <motion.div
              {...revealProps}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 border-2 border-primary bg-primary px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
              >
                View Projects

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center border border-border px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:border-primary hover:text-primary"
              >
                Contact Us
              </Link>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section className="py-24 lg:py-32">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <motion.div
            {...revealProps}
            className="max-w-3xl"
          >

            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              WHAT WE DO
            </span>

            <h2 className="mt-4 text-4xl font-black sm:text-6xl">
              Three disciplines.
              <br />
              One studio.
            </h2>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We combine acoustics, lighting and
              audio visual engineering into one
              seamless experience from design
              through execution.
            </p>

          </motion.div>

          <motion.div
            {...staggerContainer}
            className={`mt-14 flex flex-col gap-5 lg:flex-row ${expandedService ? "lg:gap-0" : ""
              }`}
          >
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                service={service}
                expanded={expandedService === service.title}
                anyExpanded={expandedService !== null}
                onToggle={() =>
                  setExpandedService((current) =>
                    current === service.title ? null : service.title
                  )
                }
              />
            ))}
          </motion.div>

        </div>
      </section>

      {/* ================= TRUSTED BY ================= */}

      <TrustedBy />

      {/* ================= SELECTED PROJECTS ================= */}
      
      <SelectedProjects />

      {/* ================= CTA ================= */}

      <section ref={ctaSectionRef} className="relative z-0 overflow-hidden border-t border-border py-28">

        {/* Cinematic background slideshow */}
        <div className="absolute inset-0 z-0">
          {bgImages.map((img, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={img.src}
                className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
                style={{
                  opacity: prefersReducedMotion ? (isFirst ? 1 : 0) : (index === currentCtaIndex ? 1 : 0)
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={isFirst}
                  loading={isFirst ? undefined : "lazy"}
                  className="object-cover scale-110 blur-[20px] brightness-[0.35] saturate-[0.85] select-none pointer-events-none"
                />
              </div>
            );
          })}
        </div>

        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/85 md:bg-black/75 z-10" />

        {/* Grid lines overlay */}
        <div className="grid-lines absolute inset-0 opacity-30 z-20" />

        <motion.div
          {...revealProps}
          className="relative z-30 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary">
            LET&apos;S BUILD SOMETHING
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">
            Ready to transform
            <br />

            <span className="text-primary">
              your space?
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            Whether you&apos;re designing a home theatre,
            auditorium, studio, hospitality venue or
            commercial building, let&apos;s create an
            experience that looks stunning and sounds
            exceptional.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border-2 border-primary bg-primary px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
            >
              Start Your Project

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:border-primary hover:text-primary"
            >
              View Portfolio
            </Link>

          </div>
        </motion.div>

      </section>
    </SiteLayout>
  );
} 