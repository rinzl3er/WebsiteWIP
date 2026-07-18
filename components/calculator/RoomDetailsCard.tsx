"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoomShapeIllustration } from "./RoomShapeIllustration";
import { motion, AnimatePresence } from "framer-motion";

export function RoomDetailsCard() {
  const [roomShape, setRoomShape] = useState("Standard Room");

  return (
    <Card className="bg-ink border-border/50 shadow-2xl overflow-hidden rounded-2xl relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10" />
      <CardHeader className="border-b border-border/30 pb-6 pt-8">
        <CardTitle className="text-xl font-light tracking-wide text-primary">Room Details</CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 p-6 sm:p-0">
          <div className="space-y-10">
            <div className="space-y-4">
              <Label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Room Shape</Label>
              <Select value={roomShape} onValueChange={setRoomShape}>
                <SelectTrigger className="w-full bg-ink-soft border-border/50 h-14 text-lg focus:ring-primary/50 rounded-xl px-4">
                  <SelectValue placeholder="Select room shape" />
                </SelectTrigger>
                <SelectContent className="bg-ink-soft border-border/50 text-foreground rounded-xl">
                  <SelectItem value="Standard Room">Standard Room</SelectItem>
                  <SelectItem value="Sloped Ceiling">Sloped Ceiling</SelectItem>
                  <SelectItem value="Vaulted Ceiling">Vaulted Ceiling</SelectItem>
                  <SelectItem value="Custom Room">Custom Room</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Geometry</Label>
              <div className="relative min-h-[160px]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={roomShape}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 gap-x-6 gap-y-6"
                  >
                    {roomShape === "Standard Room" && (
                      <>
                        <GeometryInput label="Length (L)" id="length" />
                        <GeometryInput label="Width (W)" id="width" />
                        <GeometryInput label="Height (H)" id="height" />
                      </>
                    )}
                    {roomShape === "Sloped Ceiling" && (
                      <>
                        <GeometryInput label="Length (L)" id="length" />
                        <GeometryInput label="Width (W)" id="width" />
                        <GeometryInput label="Height 1 (H1)" id="height1" />
                        <GeometryInput label="Height 2 (H2)" id="height2" />
                      </>
                    )}
                    {roomShape === "Vaulted Ceiling" && (
                      <>
                        <GeometryInput label="Length (L)" id="length" />
                        <GeometryInput label="Width (W)" id="width" />
                        <GeometryInput label="Height 1 (H1)" id="height1" />
                        <GeometryInput label="Height 2 (H2)" id="height2" />
                      </>
                    )}
                    {roomShape === "Custom Room" && (
                      <>
                        <GeometryInput label="Volume" id="volume" />
                        <GeometryInput label="Floor Area" id="floor_area" />
                        <GeometryInput label="Wall Area" id="wall_area" />
                        <GeometryInput label="Ceiling Area" id="ceiling_area" />
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center p-8 bg-ink-soft rounded-2xl border border-border/30 relative overflow-hidden group">
            <div className="absolute inset-0 grid-lines opacity-10" />
            <RoomShapeIllustration shape={roomShape} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function GeometryInput({ label, id }: { label: string; id: string }) {
  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-xs text-muted-foreground">{label}</Label>
      <Input
        id={id}
        type="number"
        placeholder="0.0"
        className="bg-transparent border-0 border-b border-border/50 h-10 px-0 rounded-none font-mono focus-visible:ring-0 focus-visible:border-primary/50 text-lg transition-colors"
      />
    </div>
  );
}
