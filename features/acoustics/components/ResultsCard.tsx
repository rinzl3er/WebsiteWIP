"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FrequencyGraph } from "./FrequencyGraph";
import { useCalculatorStore } from "@/features/acoustics/lib/calculator-store";
import { computeGeometry, computeTotalAbsorption, calculateEyring } from "@/features/acoustics/lib/acoustic-math";
import { useMaterials } from "@/features/acoustics/components/MaterialContext";

export function ResultsCard() {
  const state = useCalculatorStore();
  const { materials } = useMaterials();
  
  const geom = computeGeometry(state);
  const absorption = computeTotalAbsorption(state, geom, materials);
  
  // Default to Eyring, per requirements
  const rt60 = calculateEyring(geom.volume, geom.totalSurfaceArea, absorption);
  
  // Mid-frequency is average of 500 and 1000
  const midFreqRT60 = (rt60[500] + rt60[1000]) / 2;
  const displayRT60 = midFreqRT60 > 0 ? midFreqRT60.toFixed(2) : "0.00";

  // Target RT60 (Hardcoded per requirement)
  const targetRT60 = 0.6;
  const hasInput = geom.volume > 0 && geom.totalSurfaceArea > 0;

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-light tracking-wide text-primary border-b border-border/30 pb-4">Acoustic Results</h2>
      <Card className="bg-ink border-border/50 overflow-hidden rounded-2xl relative shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 opacity-70" />
        
        <CardContent className="p-8 space-y-12 mt-4">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="space-y-3">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Estimated RT60</p>
              <div className="flex items-baseline gap-3">
                <span className="text-7xl md:text-8xl font-black tracking-tighter text-white">{displayRT60}</span>
                <span className="text-2xl text-muted-foreground font-light">sec</span>
              </div>
            </div>
            
            <div className="space-y-6 text-left sm:text-right">
              {hasInput ? (
                <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/5 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-widest">
                  Live Calculation (Eyring)
                </Badge>
              ) : (
                <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-widest">
                  Pending Input
                </Badge>
              )}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Target RT60</p>
                <p className="text-xl font-mono text-white/80">{targetRT60.toFixed(2)} sec</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest border-b border-border/30 pb-3">Frequency Response</h3>
            <FrequencyGraph rt60={rt60} targetRT60={targetRT60} hasInput={hasInput} />
          </div>
          
        </CardContent>
      </Card>
    </section>
  );
}
