import type { Metadata } from "next";
import { SiteLayout } from "@/components/site-layout";
import { Particles } from "@/components/particles";

export const metadata: Metadata = {
  title: "Acoustic Design Calculator — Chintan Patel",
  description: "Preliminary acoustic calculations and recommendations.",
};

export default function AcousticsToolPlaceholder() {
  return (
    <SiteLayout>
      <Particles className="-z-10" />
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Acoustic Design Calculator</h1>
        <p className="mt-2 text-lg text-muted-foreground font-mono uppercase tracking-[0.2em] px-4 py-2 border border-border rounded-full inline-block">
          Coming Soon
        </p>
      </div>
    </SiteLayout>
  );
}
