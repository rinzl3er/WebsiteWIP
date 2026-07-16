import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { PageHeader, SiteLayout } from "@/components/site-layout";
import { Particles } from "@/components/particles";
import { MetallicSweep } from "@/components/metallic-sweep";

export const metadata: Metadata = {
  title: "Contact — Chintan Patel",
  description: "Get in touch for acoustics, lighting and AV consultancy. Call +91 98191 80642 or reach us on WhatsApp.",
  openGraph: {
    title: "Contact — Chintan Patel",
    description: "Get in touch for acoustics, lighting and AV consultancy.",
  },
};

const socialLinks = [
  { href: "https://www.instagram.com/chintanpatel.co.in/", Icon: FaInstagram, label: "Instagram", handle: "@chintanpatel.co.in" },
  { href: "https://www.facebook.com/ichintanpatel/", Icon: FaFacebookF, label: "Facebook", handle: "Chintan Patel" },
  { href: "https://www.youtube.com/channel/UCUjMzeydRapI-VFIPooVcjg", Icon: FaYoutube, label: "YouTube", handle: "Chintan Patel" },
];

export default function ContactPage() {
  return (
    <SiteLayout>
      <Particles className="-z-10" />
      <PageHeader
        className="bg-transparent"
        showGridLines={false}
        showBorder={false}
        glowPosition="center"
        animateGlow={true}
        eyebrow="Contact"
        title={
          <>
            Let&apos;s design <MetallicSweep>extraordinary</MetallicSweep> spaces.
          </>
        }
        intro="Share your brief, plans, or vision. We'll help you create experiences that leave a lasting impression."
      />

      <section className="relative z-10 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            <a href="tel:+919819180642" className="group flex flex-col gap-4 border border-border bg-ink-soft p-7 transition-all duration-300 hover:border-primary hover:bg-ink">
              <IconBox><FaPhone className="h-4 w-4 text-primary" /></IconBox>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Call us</p>
                <p className="mt-1.5 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">+91 98191 80642</p>
                <p className="mt-1 text-xs text-muted-foreground">Mon – Sat, 10 am – 7 pm IST</p>
              </div>
            </a>

            <a href="https://wa.me/919819180642" target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-4 border border-border bg-ink-soft p-7 transition-all duration-300 hover:border-primary hover:bg-ink">
              <IconBox><FaWhatsapp className="h-4 w-4 text-primary" /></IconBox>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">WhatsApp</p>
                <p className="mt-1.5 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">Message us</p>
                <p className="mt-1 text-xs text-muted-foreground">Quick replies on WhatsApp</p>
              </div>
            </a>

            <a href="mailto:info@chintanpatel.co.in" className="group flex flex-col gap-4 border border-border bg-ink-soft p-7 transition-all duration-300 hover:border-primary hover:bg-ink">
              <IconBox><FaEnvelope className="h-4 w-4 text-primary" /></IconBox>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Email</p>
                <p className="mt-1.5 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">info@chintanpatel.co.in</p>
                <p className="mt-1 text-xs text-muted-foreground">Contact us through Mail</p>
              </div>
            </a>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-6 border border-border bg-ink-soft p-7 md:grid md:grid-cols-2 md:items-center md:gap-8 lg:gap-12">
              {/* Left Column */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-background">
                  <FaMapMarkerAlt className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Based in</p>
                  <p className="mt-1.5 text-lg font-bold tracking-tight">Mumbai, India</p>
                  <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Shree Ramnath CHS, Shop no.10<br />
                    Chhatrapati Shivaji Maharaj Road<br />
                    Opp. Karnataka Hall, Matunga Road West<br />
                    Mumbai, Maharashtra 400016
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground/60">
                    Serving clients across India.
                  </p>
                </div>
              </div>

              {/* Right Column: Clickable map card */}
              <a
                href="https://maps.app.goo.gl/1GWFkEiVJPXvGYTA6"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-primary/20 transition-all duration-300 hover:scale-[1.015] hover:border-primary/50 hover:shadow-lg"
              >
                <Image
                  src="/assets/mumbai_map_preview_clean.png"
                  alt="Office location map preview"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-70" />

                {/* Overlay in bottom-right corner */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-background/90 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-primary border border-primary/30 transition-all duration-300 group-hover:border-primary">
                  <span>View on Google Maps</span>
                  <span className="font-sans">↗</span>
                </div>
              </a>
            </div>

            <div className="flex flex-col gap-4 border border-border bg-ink-soft p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">/ Social</p>
              <div className="flex flex-col gap-3">
                {socialLinks.map(({ href, Icon, label, handle }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-primary">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-border transition-colors group-hover:border-primary"><Icon className="h-3.5 w-3.5" /></span>
                    <div className="min-w-0">
                      <span className="block text-sm font-medium leading-tight text-foreground transition-colors group-hover:text-primary">{label}</span>
                      <span className="block truncate font-mono text-[10px] text-muted-foreground">{handle}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function IconBox({ children }: { children: ReactNode }) {
  return <div className="flex h-10 w-10 items-center justify-center border border-border bg-background transition-colors duration-300 group-hover:border-primary">{children}</div>;
}
