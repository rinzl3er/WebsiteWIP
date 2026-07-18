"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

export function SurfaceAccordion({ surface }: { surface: string }) {
  return (
    <AccordionItem value={surface} className="border border-border/30 rounded-xl bg-ink-soft overflow-hidden px-2 data-[state=open]:border-primary/50 transition-colors">
      <AccordionTrigger className="hover:no-underline px-4 py-6 group">
        <span className="text-xl font-light tracking-wide group-hover:text-primary transition-colors">{surface}</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-6 space-y-3">
            <Label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Material</Label>
            <Select>
              <SelectTrigger className="w-full bg-ink border-border/50 h-12 focus:ring-primary/50 rounded-lg px-4">
                <SelectValue placeholder={`Select ${surface.toLowerCase()} material...`} />
              </SelectTrigger>
              <SelectContent className="bg-ink border-border/50 rounded-lg">
                <SelectItem value="concrete">Concrete, rough</SelectItem>
                <SelectItem value="wood">Wood paneling</SelectItem>
                <SelectItem value="gypsum">Gypsum board</SelectItem>
                <SelectItem value="glass">Glass</SelectItem>
                <SelectItem value="carpet">Heavy carpet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-3 space-y-3">
            <Label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Area (m²)</Label>
            <Input type="number" placeholder="0.0" className="bg-transparent border-0 border-b border-border/50 h-12 px-0 rounded-none font-mono focus-visible:ring-0 focus-visible:border-primary/50 text-lg transition-colors" />
          </div>
          <div className="md:col-span-3">
            <Button variant="outline" className="w-full border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors h-12 rounded-lg text-sm uppercase tracking-wider font-mono">
              <Plus className="w-4 h-4 mr-2" />
              Add Treatment
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
