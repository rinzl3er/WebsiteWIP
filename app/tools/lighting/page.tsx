import type { Metadata } from "next";

import { SiteLayout } from "@/components/shared/site-layout";
import { Particles } from "@/components/shared/particles";
import { MadrixCalculator } from "@/features/madrix/components/madrix-calculator";

export const metadata: Metadata = {
  title: "MADRIX 5 License Estimator | Chintan Patel",
  description: "Estimate DMX and DVI output requirements for MADRIX 5 licenses.",
};

export default function LightingToolPage() {
  return (
    <SiteLayout>
      <Particles className="-z-10" />
      <MadrixCalculator />
    </SiteLayout>
  );
}
