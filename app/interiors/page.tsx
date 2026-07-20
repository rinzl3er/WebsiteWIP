import { SiteLayout } from "@/components/shared/site-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interiors | Chintan Patel",
  description: "Landing page coming soon.",
};

export default function InteriorsPage() {
  return (
    <SiteLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">Interiors</h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground font-mono uppercase tracking-[0.2em]">Landing page coming soon.</p>
      </div>
    </SiteLayout>
  );
}
