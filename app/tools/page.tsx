import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Volume2, Lightbulb, MonitorPlay, Zap } from "lucide-react";
import { PageHeader, SiteLayout } from "@/components/site-layout";
import { Particles } from "@/components/particles";

export const metadata: Metadata = {
  title: "Engineering Tools — Chintan Patel",
  description: "Professional engineering tools for acoustics, lighting, and audiovisual system design.",
};

const toolsList = [
  {
    title: "Acoustic Design Calculator",
    description: "Analyze room acoustics using industry-standard engineering calculations including reverberation time, room geometry, absorption, and treatment recommendations.",
    badge: "Available",
    icon: Volume2,
    href: "/tools/acoustics",
    disabled: false,
  },
  {
    title: "Lighting Design Calculator",
    description: "Calculate DMX channels, pixel counts, DVI fixtures, and lighting license requirements for professional entertainment and architectural lighting systems.",
    badge: "Available",
    icon: Lightbulb,
    href: "/tools/lighting",
    disabled: false,
  },
  {
    title: "AV Engineering Tools",
    description: "Utilities for audiovisual system planning, bandwidth calculations, cable requirements, and equipment estimation.",
    badge: "Coming Soon",
    icon: MonitorPlay,
    href: "#",
    disabled: true,
  },
  {
    title: "Electrical Load Calculator",
    description: "Estimate electrical loads, power consumption, and circuit requirements for integrated lighting and AV installations.",
    badge: "Coming Soon",
    icon: Zap,
    href: "#",
    disabled: true,
  },
];

export default function ToolsPage() {
  return (
    <SiteLayout>
      <Particles className="-z-10" />
      <PageHeader
        className="bg-transparent"
        showGridLines={false}
        showBorder={false}
        eyebrow="Resources"
        title="Engineering Tools"
        intro="Get general estimations for room acoustics, lighting configurations, and AV system requirements. Built to assist with quick preliminary budgeting and scoping."
        glowPosition="center"
      />

      <section className="relative z-10 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {toolsList.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div key={index} className="relative group flex h-full">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 blur-xl ${tool.disabled ? "" : "group-hover:opacity-100"}`} />
                  <div className={`relative flex flex-col w-full rounded-2xl border border-border bg-ink-soft p-8 transition-all duration-500 h-full ${tool.disabled ? "opacity-60" : "hover:border-primary hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5"}`}>

                    <div className="flex items-center justify-between mb-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink border border-border">
                        <Icon className={`h-5 w-5 ${tool.disabled ? "text-muted-foreground" : "text-primary"}`} strokeWidth={1.5} />
                      </div>
                      <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${tool.disabled ? "border-border text-muted-foreground bg-ink" : "border-primary/30 text-primary bg-primary/5"}`}>
                        {tool.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-4">{tool.title}</h3>
                    <p className="text-muted-foreground leading-relaxed flex-grow mb-8">
                      {tool.description}
                    </p>

                    {tool.disabled ? (
                      <span
                        className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted-foreground pointer-events-none"
                      >
                        Open Tool <ArrowRight className="h-4 w-4" />
                      </span>
                    ) : (
                      <div className="flex flex-col items-start">
                        <Link
                          href={tool.href}
                          className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest transition-colors text-primary hover:text-white font-bold"
                        >
                          Open Tool <ArrowRight className="h-4 w-4" />
                        </Link>
                        <p className="text-[10px] text-muted-foreground/40 font-mono tracking-wider mt-3">
                          * Subject to minor margin discrepancies.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="relative overflow-hidden border-t border-border/50 bg-ink-dark py-24">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black md:text-5xl">Need a detailed engineering design?</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            These tools provide preliminary engineering guidance. For complete acoustic simulations, lighting design, AV integration, and project consultation, our team can deliver professional solutions tailored to your project.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border-2 border-primary bg-primary px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-transparent hover:text-primary"
            >
              Contact Our Team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
