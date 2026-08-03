import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import { PageHeader, SiteLayout } from "@/components/shared/site-layout";
import { Particles } from "@/components/shared/particles";

export const metadata: Metadata = {
  title: "About — Chintan Patel Acoustics, Lighting & AV",
  description: "Chintan Patel is a design-led studio specialising in acoustics, architectural lighting and audio-visual integration across India.",
  openGraph: {
    title: "About — Chintan Patel",
    description: "A design-led studio for acoustics, lighting and AV. Design · Consultancy · Execution.",
  },
};

const capabilities = ["Room acoustic modelling & treatment", "Sound isolation & noise control", "Home theatre design & calibration", "Auditorium & worship space acoustics", "Architectural & decorative lighting", "MADRIX augmented, pixel-mapped LED control", "AV integration & boardroom automation", "Line-array & distributed audio systems"];

const teamMembers: { name: string; role: string; image: string }[] = [
  // Add future members here:
  // { name: "Team Member", role: "Role", image: "photo-filename.jpg" },
  { name: "Employee", role: "N/A", image: "sample.jpg" },
]; 

export default function AboutPage() {
  return (
    <SiteLayout>
      <Particles className="-z-10" />
      <PageHeader className="bg-transparent" showGridLines={false} showBorder={false} glowPosition="center" animateGlow={true} eyebrow="About us" title="Where sound, light and space converge." intro="We transform spaces through integrated light, sound, and spatial design. We treat each discipline as a medium for heightening architectural intention and creating immersive sensory experiences.

From residential to hospitality and performance venues, we begin by understanding the space itself and then craft experiences that engage every dimension of human perception.." />

      <section className="relative z-10 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="font-mono text-[16px] uppercase tracking-[0.3em] text-primary">/ Practice</span>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Sound, light and image — unified as one discipline.</h2>
            <div className="mt-6 space-y-5 text-muted-foreground">
              <p>Too often, acoustics, lighting, and audiovisual design are conceived in isolation. The result: fragmented spaces shaped by competing systems rather than a singular vision.</p>
              <p>We approach differently. One studio owns the entire environment—the room's acoustic character, the movement of light, and the audiovisual systems within it. Every layer amplifies the others.</p>
              <p>With <span className="text-emerald-600">MADRIX</span> as our official dealer and consultant, we specialize in software-driven LED lighting control integrated seamlessly with our acoustic and audiovisual expertise.</p>
            </div>
          </div>
          <div className="border border-border bg-ink-soft p-8 sm:p-10">
            <h3 className="font-mono text-[16px] uppercase tracking-[0.25em] text-primary">/ Capabilities</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {capabilities.map((capability) => <li key={capability} className="flex items-start gap-3 text-base text-foreground"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" /><span>{capability}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Meet the Founder ── */}
      <section className="relative z-10 bg-transparent py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="font-mono text-[16px] uppercase tracking-[0.3em] text-primary">/ Meet the Founder</span>

          <div className="mt-10 grid gap-12 lg:grid-cols-[420px_1fr] lg:items-start lg:gap-12">
            {/* Portrait */}
            <div className="group relative overflow-hidden rounded-2xl border border-primary/30 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
              <Image
                src="/assets/Chintanportrait.jpg"
                alt="Chintan Patel portrait"
                width={420}
                height={560}
                priority
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent px-7 pb-7 pt-20">
                <h2 className="text-3xl font-black leading-none tracking-tight">Chintan Patel</h2>
                <p className="mt-2 font-mono text-[14px] uppercase tracking-[0.28em] text-primary/80">Founder &amp; Principal Consultant</p>
              </div>
            </div>

            {/* Editorial text */}
            <div className="flex flex-col">
              {/* Accent line */}
              <div className="h-px w-12 bg-primary/50" />

              {/* Pull-quote — real sentence from bio */}
              <blockquote className="mt-8 text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl lg:text-[1.65rem] lg:leading-[1.3]">
                &ldquo;He balances precision, character, and vision—orchestrating seamless integration across acoustics, lighting, and technology with architects, manufacturers, and installation teams.&rdquo;
              </blockquote>

              {/* Editorial prose */}
              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
                <p>
                  Chintan is an electrical engineer whose foundation in systems-led thinking informs every project. As a cross-disciplinary consultant for audio, lighting, and acoustic design, he brings a rare perspective: one where sound, light, and technology are conceived as a unified language from inception.
                </p>
                <p>
                   His work spans intimate home theatres to expansive hospitality venues—from minimalist refinement to richly ornate spaces. Regardless of scale or aesthetic, his methodology remains constant: understand the space, envision the experience, let that guide every technical decision.
                </p>
              </div>

              {/* Disciplines row */}
              <div className="mt-10 flex flex-wrap gap-3">
                {["Acoustics", "Lighting Design", "AV Integration", "MADRIX Control"].map((d) => (
                  <span key={d} className="border border-border/60 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.25em] text-muted-foreground transition-colors duration-300 hover:border-primary/50 hover:text-primary">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="h-px w-full bg-primary/60" />
      </div>

      
{/* Add team photos to public/team-photos, then add matching objects to teamMembers above. */}
<section className="relative z-10 bg-transparent py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <span className="font-mono text-[16px] uppercase tracking-[0.3em] text-primary">
      / Our Team
    </span>

    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fill,180px)] sm:gap-6">
      {teamMembers.map((member) => (
        <div
          key={member.name}
          className="group w-full overflow-hidden rounded-2xl border border-primary/30 bg-ink-soft shadow-[0_24px_70px_rgba(0,0,0,0.35)] transition-all duration-500 hover:border-primary/50"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={`/team-photos/${member.image}`}
              alt={`${member.name} portrait`}
              fill
              sizes="180px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

          <div className="px-4 py-4">
            <h3 className="text-base font-black leading-none tracking-tight sm:text-lg"> 
              {member.name}
            </h3>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary/80">
              {member.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="relative z-10 py-24">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <h2 className="text-3xl font-black sm:text-4xl">Bring us in early. <span className="text-primary">Save time later.</span></h2>
          <Link href="/contact" className="group inline-flex shrink-0 items-center gap-3 border-2 border-primary bg-primary px-6 py-3.5 font-mono text-sm uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-transparent hover:text-primary">Talk to us <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </section>
    </SiteLayout>
  );
}
