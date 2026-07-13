import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { PageHeader, SiteLayout } from "@/components/site-layout";

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
      <PageHeader
        eyebrow="Contact"
        title="Let's design extraordinary spaces."
        intro="Share your brief, plans, or vision. We'll help you create experiences that leave a lasting impression."
      />

      <section className="py-16 lg:py-24">
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
            <div className="flex flex-col gap-4 border border-border bg-ink-soft p-7 sm:flex-row sm:items-start sm:gap-8">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-background"><FaMapMarkerAlt className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Based in</p>
                <p className="mt-1.5 text-lg font-bold tracking-tight">Mumbai, India</p>
                <p className="mt-1 text-sm text-muted-foreground">Projects delivered pan-India. From home theatres to large auditoriums, clubs, hotels and luxury residences.</p>
              </div>
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
