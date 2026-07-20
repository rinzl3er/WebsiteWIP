"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useMaterials } from "@/features/acoustics/components/MaterialContext";
import { useCalculatorStore } from "@/features/acoustics/lib/calculator-store";

export function SurfaceAccordion({ surface }: { surface: string }) {
  const { groupedMaterials } = useMaterials();
  const surfaceState = useCalculatorStore((state) => state.surfaces[surface]);
  const setSurfaceMaterial = useCalculatorStore((state) => state.setSurfaceMaterial);
  const setSurfaceArea = useCalculatorStore((state) => state.setSurfaceArea);
  const addTreatment = useCalculatorStore((state) => state.addTreatment);
  const updateTreatment = useCalculatorStore((state) => state.updateTreatment);
  const removeTreatment = useCalculatorStore((state) => state.removeTreatment);

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSurfaceArea(surface, val === '' ? undefined : parseFloat(val));
  };

  return (
    <AccordionItem value={surface} className="border border-border/30 rounded-xl bg-ink-soft overflow-hidden px-2 data-[state=open]:border-primary/50 transition-colors">
      <AccordionTrigger className="hover:no-underline px-4 py-6 group">
        <span className="text-xl font-light tracking-wide group-hover:text-primary transition-colors">{surface}</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-6 space-y-3">
            <Label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Base Material</Label>
            <Select value={surfaceState.materialId} onValueChange={(val) => setSurfaceMaterial(surface, val)}>
              <SelectTrigger className="w-full bg-ink border-border/50 h-12 focus:ring-primary/50 rounded-lg px-4">
                <SelectValue placeholder={`Select ${surface.toLowerCase()} material...`} />
              </SelectTrigger>
              <SelectContent className="bg-ink border-border/50 rounded-lg max-h-80">
                {Object.entries(groupedMaterials).map(([category, items]) => (
                  <SelectGroup key={category}>
                    <SelectLabel className="text-primary font-mono text-xs uppercase tracking-widest">{category}</SelectLabel>
                    {items.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.displayName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-3 space-y-3">
            <Label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Area (m²) {surface === 'Doors' || surface === 'Windows' ? '' : '(Override)'}</Label>
            <Input 
              type="number" 
              value={surfaceState.customArea === undefined ? '' : surfaceState.customArea}
              onChange={handleAreaChange}
              placeholder="Auto" 
              className="bg-transparent border-0 border-b border-border/50 h-12 px-0 rounded-none font-mono focus-visible:ring-0 focus-visible:border-primary/50 text-lg transition-colors" 
            />
          </div>
          <div className="md:col-span-3">
            <Button onClick={() => addTreatment(surface)} variant="outline" className="w-full border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors h-12 rounded-lg text-sm uppercase tracking-wider font-mono">
              <Plus className="w-4 h-4 mr-2" />
              Add Treatment
            </Button>
          </div>
        </div>

        {surfaceState.treatments.map((t) => (
          <div key={t.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end pl-4 border-l-2 border-primary/20 mt-4 pt-2">
            <div className="md:col-span-6 space-y-3">
              <Label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Additional Treatment</Label>
              <Select value={t.materialId} onValueChange={(val) => updateTreatment(surface, t.id, { materialId: val })}>
                <SelectTrigger className="w-full bg-ink border-border/50 h-10 focus:ring-primary/50 rounded-lg px-4">
                  <SelectValue placeholder={`Select treatment...`} />
                </SelectTrigger>
                <SelectContent className="bg-ink border-border/50 rounded-lg max-h-80">
                  {Object.entries(groupedMaterials).map(([category, items]) => (
                    <SelectGroup key={category}>
                      <SelectLabel className="text-primary font-mono text-xs uppercase tracking-widest">{category}</SelectLabel>
                      {items.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.displayName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-3 space-y-3">
              <Label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Treatment Area (m²)</Label>
              <Input 
                type="number" 
                value={t.area || ''}
                onChange={(e) => updateTreatment(surface, t.id, { area: parseFloat(e.target.value) || 0 })}
                placeholder="0.0" 
                className="bg-transparent border-0 border-b border-border/50 h-10 px-0 rounded-none font-mono focus-visible:ring-0 focus-visible:border-primary/50 text-lg transition-colors" 
              />
            </div>
            <div className="md:col-span-3 flex justify-end">
              <Button onClick={() => removeTreatment(surface, t.id)} variant="ghost" className="text-muted-foreground hover:text-destructive h-10 px-3">
                Remove
              </Button>
            </div>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
