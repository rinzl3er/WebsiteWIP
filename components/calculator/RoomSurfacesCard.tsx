"use client";

import { Accordion } from "@/components/ui/accordion";
import { SurfaceAccordion } from "./SurfaceAccordion";

export function RoomSurfacesCard() {
  const surfaces = ["Floor", "Walls", "Ceiling", "Doors", "Windows"];

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between border-b border-border/30 pb-4">
        <h2 className="text-2xl font-light tracking-wide text-primary">Room Surfaces</h2>
      </div>
      <Accordion type="single" collapsible defaultValue="Floor" className="w-full space-y-4">
        {surfaces.map((surface) => (
          <SurfaceAccordion key={surface} surface={surface} />
        ))}
      </Accordion>
    </section>
  );
}
