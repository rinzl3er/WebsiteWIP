"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useCalculatorStore } from "@/lib/calculator-store";
import { computeGeometry } from "@/lib/acoustic-math";

export function CalculatedRoomCard() {
  const state = useCalculatorStore();
  const geom = computeGeometry(state);

  const stats = [
    { label: "Volume", value: geom.volume.toFixed(1), unit: "m³" },
    { label: "Floor Area", value: geom.floorArea.toFixed(1), unit: "m²" },
    { label: "Wall Area", value: geom.wallArea.toFixed(1), unit: "m²" },
    { label: "Ceiling Area", value: geom.ceilingArea.toFixed(1), unit: "m²" },
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-light tracking-wide text-primary border-b border-border/30 pb-4">Calculated Room</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <Card key={stat.label} className="bg-ink-soft border-border/30 overflow-hidden rounded-xl hover:border-primary/30 transition-colors group">
            <CardContent className="p-6 space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="font-mono text-4xl font-bold text-primary">0{i + 1}</span>
              </div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest relative z-10">{stat.label}</p>
              <div className="flex items-baseline gap-2 relative z-10">
                <span className="text-4xl font-light text-white">{stat.value}</span>
                <span className="text-sm text-muted-foreground font-mono">{stat.unit}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
