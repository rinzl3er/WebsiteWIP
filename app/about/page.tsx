import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { PageHeader, SiteLayout } from "@/components/site-layout";
import { Particles } from "@/components/particles";

export const metadata: Metadata = {
  title: "About — Chintan Patel Acoustics, Lighting & AV",
  description: "Chintan Patel is a design-led studio specialising in acoustics, architectural lighting and audio-visual integration across India.",
  openGraph: {
    title: "About — Chintan Patel",
    description: "A design-led studio for acoustics, lighting and AV. Design · Consultancy · Execution.",
  },
};

const capabilities = ["Room acoustic modelling & treatment", "Sound isolation & noise control", "Home theatre design & calibration", "Auditorium & worship space acoustics", "Architectural & decorative lighting", "MADRIX pixel-mapped LED control", "AV integration & boardroom automation", "Line-array & distributed audio systems"];

export default function AboutPage() {
  return (
    <SiteLayout>
      <Particles className="-z-10" />
      <PageHeader className="bg-transparent" showGridLines={false} showBorder={false} eyebrow="About us" title="Where sound, light and space come together." intro="We work across acoustics, architectural lighting and audio visual design to shape spaces as complete experiences. From private residences to hospitality and performance venues, each project begins with the space itself." />

      <section className="relative z-10 py-20 lg:py-28">
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
              {capabilities.map((capability) => <li key={capability} className="flex items-start gap-3 text-base text-foreground"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" /><span>{capability}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Meet the Founder ── */}
      <section className="relative z-10 bg-transparent py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">/ Meet the Founder</span>

          <div className="mt-10 grid gap-12 lg:grid-cols-[420px_1fr] lg:items-start lg:gap-12">
            {/* Portrait */}
            <div className="group relative overflow-hidden rounded-2xl border border-primary/30 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
              <img src="/assets/Chintanportrait.jpg" alt="Chintan Patel portrait" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent px-7 pb-7 pt-20">
                <h2 className="text-3xl font-black leading-none tracking-tight">Chintan Patel</h2>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-primary/80">Founder &amp; Principal Consultant</p>
              </div>
            </div>

            {/* Editorial text */}
            <div className="flex flex-col">
              {/* Accent line */}
              <div className="h-px w-12 bg-primary/50" />

              {/* Pull-quote — real sentence from bio */}
              <blockquote className="mt-8 text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl lg:text-[1.65rem] lg:leading-[1.3]">
                &ldquo;He balances detail, character and fundamentals — working closely with architects, manufacturers and installation teams to achieve seamless integration of technologies.&rdquo;
              </blockquote>

              {/* Editorial prose */}
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  Chintan is an electrical engineer whose foundation in systems-led thinking shapes every project he touches. As a one-stop consultant for audio, video, lighting design and acoustic works, he brings a rare cross-disciplinary perspective — one where sound, light and technology are considered together from day one.
                </p>
                <p>
                  His projects range from home theatres to restaurants, clubs, hotels and luxury homes, moving between minimalist, rich ornate classic and vibrant styles. Whether the brief calls for an intimate listening room or a large-scale hospitality venue, the approach remains the same: start with the space, understand how it will be experienced, and let that guide every technical decision.
                </p>
              </div>

              {/* Disciplines row */}
              <div className="mt-10 flex flex-wrap gap-3">
                {["Acoustics", "Lighting Design", "AV Integration", "MADRIX Control"].map((d) => (
                  <span key={d} className="border border-border/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 hover:border-primary/50 hover:text-primary">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-24">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <h2 className="text-3xl font-black sm:text-4xl">Bring us in early. <span className="text-primary">Save time later.</span></h2>
          <Link href="/contact" className="group inline-flex shrink-0 items-center gap-3 border-2 border-primary bg-primary px-6 py-3.5 font-mono text-sm uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary">Talk to us <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}