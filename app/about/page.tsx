import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { PageHeader, SiteLayout } from "@/components/site-layout";

export const metadata: Metadata = {
  title: "About — Chintan Patel Acoustics, Lighting & AV",
  description: "Chintan Patel is a design-led studio specialising in acoustics, architectural lighting and audio-visual integration across India.",
  openGraph: {
    title: "About — Chintan Patel",
    description: "A design-led studio for acoustics, lighting and AV. Design · Consultancy · Execution.",
  },
};

const capabilities = ["Room acoustic modelling & treatment", "Sound isolation & noise control", "Home theatre design & calibration", "Auditorium & worship space acoustics", "Architectural & decorative lighting", "MADRIX pixel-mapped LED control", "AV integration & boardroom automation", "Line-array & distributed audio systems"];
const domains = [
  { label: "ENGINEERING FOUNDATION", desc: "An electrical engineering foundation informs a precise, systems-led approach to every space." },
  { label: "CROSS-DISCIPLINARY", desc: "Experience across acoustics, lighting and AV allows each discipline to be considered together." },
  { label: "DESIGN COLLABORATION", desc: "Works closely with architects, designers and project teams from concept through execution." },
  { label: "PAN-INDIA PRACTICE", desc: "Project experience across India spanning residential, hospitality and entertainment spaces." },
];

export default function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="About us" title="Where sound, light and space come together." intro="We work across acoustics, architectural lighting and audio visual design to shape spaces as complete experiences. From private residences to hospitality and performance venues, each project begins with the space itself." />

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">/ Practice</span>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Sound, light and image — treated as one discipline.</h2>
            <div className="mt-6 space-y-5 text-muted-foreground">
              <p>Too often, acoustics, lighting and AV are designed in isolation. The result is a space shaped by separate systems rather than a singular vision.</p>
              <p>We work differently. One studio owns the whole environment: the room&apos;s acoustic behaviour, the way light moves through it, and the AV systems that live inside it, so every layer supports the others.</p>
              <p>With <span className="text-emerald-600">MADRIX</span> as our official dealer and consultant, we specialise in software-driven LED lighting control alongside our acoustic and AV work.</p>
            </div>
          </div>
          <div className="border border-border bg-ink-soft p-8 sm:p-10">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">/ Capabilities</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {capabilities.map((capability) => <li key={capability} className="flex items-start gap-3 text-sm text-foreground"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" /><span>{capability}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-ink py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">/ Meet the Founder</span>
          <div className="mt-10 grid gap-12 lg:grid-cols-[420px_1fr] lg:items-start lg:gap-16">
            <div className="group relative overflow-hidden rounded-2xl border border-primary/30 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
              <img src="/assets/Chintanportrait.jpg" alt="Chintan Patel portrait" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent px-7 pb-7 pt-20">
                <h2 className="text-3xl font-black leading-none tracking-tight">Chintan Patel</h2>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">Founder &amp; Principal Consultant</p>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div className="grid gap-8 sm:grid-cols-2">
                <Bio title="Introduction">Chintan is an electrical engineer with experience in acoustics, sound and lighting. A one-stop consultant for audio/video, lighting design and acoustic works across a wide range of projects.</Bio>
                <Bio title="Design Philosophy">He balances detail, character and fundamentals — working closely with architects, manufacturers and installation teams to achieve seamless integration of technologies.</Bio>
                <Bio title="Industry Experience" className="sm:col-span-2">His projects range from home theatres to restaurants, clubs, hotels and luxury homes, moving between minimalist, rich ornate classic and vibrant styles.</Bio>
              </div>
              <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                {domains.map((domain) => <div key={domain.label} className="flex flex-col gap-2 rounded-xl border border-border bg-ink-soft p-5 transition-colors duration-300 hover:border-primary/50"><p className="font-mono text-[9px] uppercase tracking-[0.28em] text-primary">{domain.label}</p><p className="text-xs leading-relaxed text-muted-foreground">{domain.desc}</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <h2 className="text-3xl font-black sm:text-4xl">Bring us in early. <span className="text-primary">Save time later.</span></h2>
          <Link href="/contact" className="group inline-flex shrink-0 items-center gap-3 border-2 border-primary bg-primary px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary">Talk to us <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function Bio({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return <div className={className}><p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">{title}</p><div className="mt-3 h-px w-8 bg-primary/40" /><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{children}</p></div>;
}