"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { revealProps } from "@/lib/motion";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

function Logo({ large = false }: { large?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Chintan Patel — Home"
      className="group flex items-center gap-3"
    >
      <Image
        src="/assets/cpalslogo.png"
        alt="Chintan Patel Logo"
        width={large ? 220 : 170}
        height={70}
        priority
        className={`w-auto object-contain ${
          large ? "h-14" : "h-11"
        }`}
      />
    </Link>
  );
}

function useDelayedUnmount(
  isMounted: boolean,
  delayTime: number
) {
  const [shouldRender, setShouldRender] = useState(isMounted);
  const [prevIsMounted, setPrevIsMounted] = useState(isMounted);

  if (isMounted !== prevIsMounted) {
    setPrevIsMounted(isMounted);
    if (isMounted) {
      setShouldRender(true);
    }
  }

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isMounted && shouldRender) {
      timeoutId = setTimeout(
        () => setShouldRender(false),
        delayTime
      );
    }

    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);

  return shouldRender;
}

function Header() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const shouldRenderMenu = useDelayedUnmount(
    open,
    300
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <Logo large />

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const isActive =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative px-4 py-2 font-mono text-sm uppercase tracking-[0.2em] transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {item.label}

                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-primary transition-transform ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          <a
            href="tel:+919819180642"
            className="ml-3 inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2 font-mono text-sm uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
          >
            <FaPhoneAlt className="h-3.5 w-3.5" />
            Enquire
          </a>
        </nav>

        <button
          onClick={() =>
            setOpen((v) => !v)
          }
          className="grid h-12 w-12 place-items-center border border-border text-primary md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? (
            <FaTimes className="h-5 w-5" />
          ) : (
            <FaBars className="h-5 w-5" />
          )}
        </button>
      </div>

      {shouldRenderMenu && (
        <div
          className={`border-t border-border/60 bg-ink md:hidden transition-all duration-300 ${
            open
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
        >
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {nav.map((item) => {
              const isActive =
                pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className={`border-b border-border/40 py-4 font-mono text-base uppercase tracking-[0.2em] last:border-none ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <a
              href="tel:+919819180642"
              className="mt-3 mb-2 inline-flex items-center justify-center gap-2 bg-primary py-3 font-mono text-sm uppercase tracking-[0.2em] text-primary-foreground"
            >
              <FaPhoneAlt className="h-3.5 w-3.5" />
              +91 98191 80642
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
function Footer() {
  return (
    <footer className="relative z-20 border-t border-border/60 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1.35fr)_max-content_max-content] lg:gap-x-10 lg:px-8">

        <div>
          <Logo large />

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Design, consultancy & execution for acoustics,
            architectural lighting and visual systems.
          </p>
        </div>

        <div>
          <a
            href="https://www.madrix.com"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/assets/MADRIX_Logo_whiteTypo_onBlack_noBg-768x288.png"
              alt="MADRIX"
              width={220}
              height={80}
              className="h-14 w-auto object-contain"
            />
          </a>

          <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
            Official dealer & consultant for MADRIX lighting
            control software and pixel-mapped LED control
            supporting DMX512, DVI and Art-Net.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Navigate
          </h4>

          <ul className="mt-5 space-y-3 text-base">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
            Contact
          </h4>

          <ul className="mt-5 space-y-3 text-base text-muted-foreground">

            <li className="flex items-start gap-2">
              <FaPhoneAlt className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

              <a
                href="tel:+919819180642"
                className="hover:text-primary"
              >
                +91 98191 80642
              </a>
            </li>

            <li className="flex items-start gap-2">
              <FaEnvelope className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

              <a
                href="mailto:info@chintanpatel.co.in"
                className="hover:text-primary"
              >
                info@chintanpatel.co.in
              </a>
            </li>

          </ul>

          <div className="mt-6 flex items-center gap-3">

            {[
              {
                href: "https://www.facebook.com/ichintanpatel/",
                Icon: FaFacebookF,
                label: "Facebook",
              },
              {
                href: "https://www.instagram.com/chintanpatel.co.in/",
                Icon: FaInstagram,
                label: "Instagram",
              },
              {
                href: "https://www.youtube.com/channel/UCUjMzeydRapI-VFIPooVcjg",
                Icon: FaYoutube,
                label: "YouTube",
              },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}

          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:px-6 lg:px-8">

          <span>
            © {new Date().getFullYear()} Chintan Patel.
            All rights reserved.
          </span>

          <span>
            Design · Consultancy · Execution
          </span>

        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="page-transition flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  className = "bg-ink",
  showGridLines = true,
  showBorder = true,
  glowPosition = "right",
  animateGlow = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  className?: string;
  showGridLines?: boolean;
  showBorder?: boolean;
  glowPosition?: "right" | "center" | "none";
  animateGlow?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden ${showBorder ? "border-b border-border/60" : ""} ${className}`}>

      {showGridLines && <div className="grid-lines absolute inset-0 opacity-60" />}

      {glowPosition !== "none" && (
        <div className={`absolute top-[-8rem] ${glowPosition === "center" ? "left-1/2 -translate-x-1/2" : "right-0"}`}>
          <motion.div 
            className="h-96 w-96 rounded-full bg-primary/10 blur-3xl"
            animate={animateGlow ? { x: [-30, 30, -30], y: [-20, 20, -20] } : undefined}
            transition={animateGlow ? { duration: 10, repeat: Infinity, ease: "easeInOut" } : undefined}
          />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

        <motion.div
          {...revealProps}
          className="flex items-center gap-3"
        >
          <span className="h-px w-10 bg-primary" />

          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          {...revealProps}
          className="mt-6 text-4xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        {intro && (
          <motion.p
            {...revealProps}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {intro}
          </motion.p>
        )}

      </div>
    </section>
  );
}