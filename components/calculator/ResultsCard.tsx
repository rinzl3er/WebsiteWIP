"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FrequencyGraphPlaceholder } from "./FrequencyGraphPlaceholder";
import { RecommendationsPlaceholder } from "./RecommendationsPlaceholder";

export function ResultsCard() {
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
                <span className="text-7xl md:text-8xl font-black tracking-tighter text-white">0.00</span>
                <span className="text-2xl text-muted-foreground font-light">sec</span>
              </div>
            </div>
            
            <div className="space-y-6 text-left sm:text-right">
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-widest">
                Pending Input
              </Badge>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Target RT60</p>
                <p className="text-xl font-mono text-white/80">0.00 sec</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest border-b border-border/30 pb-3">Frequency Response</h3>
            <FrequencyGraphPlaceholder />
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest border-b border-border/30 pb-3">Recommendations</h3>
            <RecommendationsPlaceholder />
          </div>
          
        </CardContent>
      </Card>
    </section>
  );
}
