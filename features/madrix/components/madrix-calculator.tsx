"use client";

import { useMemo, useState, useEffect } from "react";
import { Layers3, Settings, Zap, Copy, Trash2, Pencil } from "lucide-react";

import {
  calculateLedStrip,
  calculatePixelFixture,
  calculateDviResolution,
  calculateDviArea,
  calculateDviFixtureSize,
  calculateDviPixelCount,
  matchLicense,
  percent,
  formatNumber,
} from "@/features/madrix/calculator";
import type { StripType, CalculationResults, DviInputMethod, DviProjectItem } from "@/features/madrix/types";

type DmxTab = "led_strip" | "pixel_count";

export function MadrixCalculator() {
  // DMX Calculator Tab
  const [dmxTab, setDmxTab] = useState<DmxTab>("led_strip");

  // LED Strip Calculator States
  const [stripType, setStripType] = useState<StripType>("rgbw");
  const [stripLength, setStripLength] = useState<string>("0");

  // Pixel Calculator States
  const [pixelCount, setPixelCount] = useState<string>("0");
  const [channelsPerPixel, setChannelsPerPixel] = useState<string>("0");

  // DVI Calculator Input States
  const [dviInputMethod, setDviInputMethod] = useState<DviInputMethod>("resolution");
  const [dviItemName, setDviItemName] = useState<string>("");

  // DVI Resolution Mode States
  const [resX, setResX] = useState<string>("0");
  const [resY, setResY] = useState<string>("0");
  const [resZ, setResZ] = useState<string>("");
  const [resCount, setResCount] = useState<string>("0");

  // DVI Area Mode States
  const [areaVal, setAreaVal] = useState<string>("0");
  const [areaUnit, setAreaUnit] = useState<string>("m2");
  const [areaPitch, setAreaPitch] = useState<string>("0");

  // DVI Fixture Size Mode States
  const [sizeW, setSizeW] = useState<string>("0");
  const [sizeH, setSizeH] = useState<string>("0");
  const [sizeUnit, setSizeUnit] = useState<string>("mm");
  const [sizePitch, setSizePitch] = useState<string>("0");
  const [sizeCount, setSizeCount] = useState<string>("0");

  // DVI Pixel Count Mode States
  const [countPixels, setCountPixels] = useState<string>("0");
  const [countFixtures, setCountFixtures] = useState<string>("0");

  // DVI Project State
  const [dviProjectItems, setDviProjectItems] = useState<DviProjectItem[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingNameValue, setEditingNameValue] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  // Load project items from LocalStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem("chintan-patel-madrix-dvi-project");
      if (saved) {
        setDviProjectItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save project items to LocalStorage on change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("chintan-patel-madrix-dvi-project", JSON.stringify(dviProjectItems));
    }
  }, [dviProjectItems, isMounted]);

  // Calculations: DMX
  const stripResults = useMemo(() => {
    const len = parseFloat(stripLength);
    return calculateLedStrip(Number.isFinite(len) && len > 0 ? len : 0, stripType);
  }, [stripLength, stripType]);

  const pixelResults = useMemo(() => {
    const pix = parseFloat(pixelCount);
    const ch = parseFloat(channelsPerPixel);
    return calculatePixelFixture(
      Number.isFinite(pix) && pix > 0 ? pix : 0,
      Number.isFinite(ch) && ch > 0 ? ch : 0
    );
  }, [pixelCount, channelsPerPixel]);

  // Active DMX Results & Channels
  const activeDmxResults = dmxTab === "led_strip" ? stripResults : pixelResults;

  // Calculations: DVI Live Item
  const liveDviPixels = useMemo(() => {
    if (dviInputMethod === "resolution") {
      const x = parseFloat(resX) || 0;
      const y = parseFloat(resY) || 0;
      const rawZ = parseFloat(resZ);
      const z = Number.isFinite(rawZ) && rawZ > 0 ? rawZ : 1;
      const cnt = parseFloat(resCount) || 0;
      return calculateDviResolution(x, y, z, cnt);
    } else if (dviInputMethod === "area") {
      const area = parseFloat(areaVal) || 0;
      const pitch = parseFloat(areaPitch) || 0;
      return calculateDviArea(area, areaUnit, pitch);
    } else if (dviInputMethod === "fixture_size") {
      const w = parseFloat(sizeW) || 0;
      const h = parseFloat(sizeH) || 0;
      const pitch = parseFloat(sizePitch) || 0;
      const cnt = parseFloat(sizeCount) || 0;
      return calculateDviFixtureSize(w, h, sizeUnit, pitch, cnt);
    } else {
      const pct = parseFloat(countPixels) || 0;
      const cnt = parseFloat(countFixtures) || 0;
      return calculateDviPixelCount(pct, cnt);
    }
  }, [
    dviInputMethod,
    resX, resY, resZ, resCount,
    areaVal, areaUnit, areaPitch,
    sizeW, sizeH, sizeUnit, sizePitch, sizeCount,
    countPixels, countFixtures
  ]);

  // Calculations: DVI Total Project
  const totalDviPixels = useMemo(() => {
    return dviProjectItems.reduce((sum, item) => sum + item.pixels, 0);
  }, [dviProjectItems]);

  // Project functions
  const addDviItemToProject = () => {
    const pixels = liveDviPixels;
    if (pixels <= 0) return;

    let parameters = "";
    if (dviInputMethod === "resolution") {
      const rawZ = parseFloat(resZ);
      const zVal = Number.isFinite(rawZ) && rawZ > 0 ? rawZ : 1;
      parameters = `${resX} × ${resY} × ${zVal} px | Qty: ${resCount}`;
    } else if (dviInputMethod === "area") {
      parameters = `${areaVal} ${areaUnit === "m2" ? "m²" : areaUnit} | Pitch: ${areaPitch}mm`;
    } else if (dviInputMethod === "fixture_size") {
      parameters = `${sizeW} × ${sizeH} ${sizeUnit} | Pitch: ${sizePitch}mm | Qty: ${sizeCount}`;
    } else {
      parameters = `${countPixels} px | Qty: ${countFixtures}`;
    }

    const name = dviItemName.trim() || `Display ${dviProjectItems.length + 1}`;

    const newItem: DviProjectItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      inputMethod: dviInputMethod,
      pixels,
      parameters,
      rawInputs: {
        resolution: { x: resX, y: resY, z: resZ, count: resCount },
        area: { val: areaVal, unit: areaUnit, pitch: areaPitch },
        fixtureSize: { w: sizeW, h: sizeH, unit: sizeUnit, pitch: sizePitch, count: sizeCount },
        pixelCount: { count: countPixels, fixtureCount: countFixtures }
      }
    };

    setDviProjectItems((prev) => [...prev, newItem]);
    setDviItemName(""); // reset name input
  };

  const duplicateDviItem = (item: DviProjectItem) => {
    const newItem: DviProjectItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: `${item.name} (Copy)`,
    };
    setDviProjectItems((prev) => [...prev, newItem]);
  };

  const deleteDviItem = (id: string) => {
    setDviProjectItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearDviProject = () => {
    setDviProjectItems([]);
  };

  const startRename = (item: DviProjectItem) => {
    setEditingItemId(item.id);
    setEditingNameValue(item.name);
  };

  const saveRename = (id: string) => {
    setDviProjectItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: editingNameValue } : item))
    );
    setEditingItemId(null);
  };

  const dmxTabs: { id: DmxTab; label: string }[] = [
    { id: "led_strip", label: "LED Strip" },
    { id: "pixel_count", label: "Pixel Count" },
  ];

  const dviMethods: { id: DviInputMethod; label: string }[] = [
    { id: "resolution", label: "Resolution" },
    { id: "area", label: "Area" },
    { id: "fixture_size", label: "Fixture Size" },
    { id: "pixel_count", label: "Pixel Count" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
          <span className="h-px w-10 bg-primary" /> Lighting tools
        </div>
        <h1 className="mt-5 text-4xl font-black sm:text-6xl">
          MADRIX 5 License<br />
          <span className="text-primary">Estimator.</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Calculate DMX output requirements and estimate the smallest suitable MADRIX 5 license for your LED installation.
        </p>
      </div>

      {/* Main Containers */}
      <div className="mt-12 space-y-12">
        {/* DMX Section */}
        <section className="border-b border-border/50 pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">01 / DMX Section</p>
              <h2 className="mt-2 text-3xl font-bold">DMX Estimator</h2>
            </div>
            <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
              Channel-based
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Left Column: Calculator Card */}
            <div className="lg:col-span-7 rounded-2xl border border-border bg-ink-soft p-6 sm:p-8 flex flex-col justify-between hover:border-primary/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-2.5">
                  <Zap className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold text-white">DMX Calculator</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select an input method to calculate channels, universes, nebulas, and drives.
                </p>

                {/* Input Method Tabs */}
                <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-ink/50 border border-border">
                  {dmxTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setDmxTab(tab.id)}
                      className={`flex-1 min-w-[90px] py-2 px-3 rounded-lg text-[10px] font-mono uppercase tracking-wider transition ${dmxTab === tab.id
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-muted-foreground hover:text-white hover:bg-ink-soft"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Dynamic Inputs based on Tab */}
                {dmxTab === "led_strip" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">
                        Strip Type
                      </span>
                      <select
                        value={stripType}
                        onChange={(e) => setStripType(e.target.value as StripType)}
                        className="tool-input bg-ink text-foreground border-border"
                      >
                        <option value="rgbw">RGBW Strip (20 px/m, 4 ch/px)</option>
                        <option value="rgb_60">RGB 60 LED (20 px/m, 3 ch/px)</option>
                        <option value="rgb_30">RGB 30 LED (10 px/m, 3 ch/px)</option>
                      </select>
                    </label>

                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">
                        Total Length (meters)
                      </span>
                      <input
                        type="number"
                        step="any"
                        min="0"
                        value={stripLength}
                        onChange={(e) => setStripLength(e.target.value)}
                        placeholder="0"
                        className="tool-input"
                      />
                    </label>
                  </div>
                )}

                {dmxTab === "pixel_count" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">
                        Total Pixels
                      </span>
                      <input
                        type="number"
                        step="any"
                        min="0"
                        value={pixelCount}
                        onChange={(e) => setPixelCount(e.target.value)}
                        placeholder="0"
                        className="tool-input"
                      />
                    </label>

                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">
                        Channels per Pixel
                      </span>
                      <input
                        type="number"
                        step="any"
                        min="0"
                        value={channelsPerPixel}
                        onChange={(e) => setChannelsPerPixel(e.target.value)}
                        placeholder="0"
                        className="tool-input"
                      />
                    </label>
                  </div>
                )}

                {/* Results Area */}
                <div className="border-t border-border/40 pt-6">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-4 font-bold">
                    Calculation Results
                  </h4>
                  <ResultsList results={activeDmxResults} />
                </div>
              </div>

              {/* License recommendation */}
              <div className="mt-8 border-t border-border/40 pt-6">
                <LicenseRecommendation dmxChannels={activeDmxResults.channels} />
              </div>
            </div>

            {/* Right Column: Information card for DMX */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-border bg-ink-soft p-6 sm:p-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">About DMX Output</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  DMX512 controls individual channels (RGB, RGBW, etc.). The MADRIX software outputs control signals across 512-channel DMX universes.
                </p>
                <div className="rounded-xl border border-border bg-ink p-4 space-y-2 text-xs font-mono text-muted-foreground">
                  <div className="flex justify-between">
                    <span>1 DMX Universe</span>
                    <span className="text-white">512 Channels</span>
                  </div>
                  <div className="flex justify-between border-t border-border/40 pt-2">
                    <span>1 MADRIX NEBULA</span>
                    <span className="text-white">12 Universes</span>
                  </div>
                  <div className="flex justify-between border-t border-border/40 pt-2">
                    <span>MADRIX STELLA / ORION</span>
                    <span className="text-white">Direct SPI/DMX Control</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DVI Section */}
        <section className="pb-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">02 / DVI Section</p>
              <h2 className="mt-2 text-3xl font-bold">DVI Estimator</h2>
            </div>
            <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
              Project Builder
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Left Column: Calculator Card */}
            <div className="lg:col-span-7 rounded-2xl border border-border bg-ink-soft p-6 sm:p-8 flex flex-col justify-between hover:border-primary/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-2.5">
                  <Settings className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold text-white">DVI Calculator</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select an input method, specify display configurations, and add them to your active DVI project list.
                </p>

                {/* Input Method Tabs */}
                <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-ink/50 border border-border">
                  {dviMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setDviInputMethod(method.id)}
                      className={`flex-1 min-w-[90px] py-2 px-3 rounded-lg text-[10px] font-mono uppercase tracking-wider transition ${dviInputMethod === method.id
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-muted-foreground hover:text-white hover:bg-ink-soft"
                        }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>

                {/* Project Item Name (Optional) */}
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">
                    Display Name / Label (Optional)
                  </span>
                  <input
                    type="text"
                    value={dviItemName}
                    onChange={(e) => setDviItemName(e.target.value)}
                    placeholder="e.g. Main Screen, DJ Booth, Left Panel"
                    className="tool-input"
                  />
                </label>

                {/* Dynamic Inputs based on Tab */}
                {dviInputMethod === "resolution" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Pixels X</span>
                      <input type="number" step="any" min="0" value={resX} onChange={(e) => setResX(e.target.value)} placeholder="0" className="tool-input" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Pixels Y</span>
                      <input type="number" step="any" min="0" value={resY} onChange={(e) => setResY(e.target.value)} placeholder="0" className="tool-input" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Pixels Z</span>
                      <input type="number" step="any" min="0" value={resZ} onChange={(e) => setResZ(e.target.value)} placeholder="1 " className="tool-input" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Fixture Qty</span>
                      <input type="number" step="any" min="0" value={resCount} onChange={(e) => setResCount(e.target.value)} placeholder="0" className="tool-input" />
                    </label>
                  </div>
                )}

                {dviInputMethod === "area" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <label className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Area</span>
                        <input type="number" step="any" min="0" value={areaVal} onChange={(e) => setAreaVal(e.target.value)} placeholder="0" className="tool-input" />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Area Unit</span>
                        <select value={areaUnit} onChange={(e) => setAreaUnit(e.target.value)} className="tool-input bg-ink text-foreground border-border">
                          <option value="m2">m²</option>
                          <option value="dm2">dm²</option>
                          <option value="cm2">cm²</option>
                          <option value="mm2">mm²</option>
                          <option value="in2">in²</option>
                          <option value="ft2">ft²</option>
                          <option value="yd2">yd²</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Pitch (mm)</span>
                        <input type="number" step="any" min="0" value={areaPitch} onChange={(e) => setAreaPitch(e.target.value)} placeholder="0" className="tool-input" />
                      </label>
                    </div>
                    <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3 text-[11px] text-yellow-400/90 font-mono">
                      ⚠️ This calculation assumes a square display area. Results may be inaccurate for non-square LED walls.
                    </div>
                  </div>
                )}

                {dviInputMethod === "fixture_size" && (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Width</span>
                      <input type="number" step="any" min="0" value={sizeW} onChange={(e) => setSizeW(e.target.value)} placeholder="0" className="tool-input" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Height</span>
                      <input type="number" step="any" min="0" value={sizeH} onChange={(e) => setSizeH(e.target.value)} placeholder="0" className="tool-input" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Unit</span>
                      <select value={sizeUnit} onChange={(e) => setSizeUnit(e.target.value)} className="tool-input bg-ink text-foreground border-border">
                        <option value="m">m</option>
                        <option value="dm">dm</option>
                        <option value="cm">cm</option>
                        <option value="mm">mm</option>
                        <option value="inch">inch</option>
                        <option value="foot">foot</option>
                        <option value="yard">yard</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Pitch (mm)</span>
                      <input type="number" step="any" min="0" value={sizePitch} onChange={(e) => setSizePitch(e.target.value)} placeholder="0" className="tool-input" />
                    </label>
                    <label className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Qty</span>
                      <input type="number" step="any" min="0" value={sizeCount} onChange={(e) => setSizeCount(e.target.value)} placeholder="0" className="tool-input" />
                    </label>
                  </div>
                )}

                {dviInputMethod === "pixel_count" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Pixels per Fixture</span>
                      <input type="number" step="any" min="0" value={countPixels} onChange={(e) => setCountPixels(e.target.value)} placeholder="0" className="tool-input" />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-muted-foreground">Fixture Qty</span>
                      <input type="number" step="any" min="0" value={countFixtures} onChange={(e) => setCountFixtures(e.target.value)} placeholder="0" className="tool-input" />
                    </label>
                  </div>
                )}

                {/* Action Area */}
                <div className="border-t border-border/40 pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary font-bold">
                        Live Calculation (Current Item)
                      </h4>
                      <p className="mt-2 text-2xl font-black text-white font-mono truncate max-w-[320px]" title={String(liveDviPixels)}>
                        {liveDviPixels} <span className="text-xs text-muted-foreground font-normal">pixels</span>
                      </p>
                    </div>
                    <button
                      onClick={addDviItemToProject}
                      disabled={liveDviPixels <= 0}
                      className="tool-primary disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Add To Project
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Project List & License Recommendation */}
            <div className="lg:col-span-5 space-y-6">
              {/* DVI Project List Card */}
              <div className="rounded-2xl border border-border bg-ink-soft p-6 sm:p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Layers3 className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold text-white">DVI Project List</h3>
                  </div>
                  <span className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] text-primary">
                    {dviProjectItems.length} items
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {dviProjectItems.length === 0 ? (
                    <div className="text-sm text-muted-foreground py-10 text-center border border-dashed border-border rounded-xl">
                      No displays added yet.
                    </div>
                  ) : (
                    dviProjectItems.map((item) => (
                      <div key={item.id} className="rounded-xl border border-border bg-ink p-4 space-y-2 group transition hover:border-primary/20">
                        <div className="flex items-start justify-between gap-3">
                          {editingItemId === item.id ? (
                            <div className="flex items-center gap-1.5 flex-1">
                              <input
                                type="text"
                                value={editingNameValue}
                                onChange={(e) => setEditingNameValue(e.target.value)}
                                className="tool-input h-8 text-xs"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") saveRename(item.id);
                                }}
                              />
                              <button
                                onClick={() => saveRename(item.id)}
                                className="text-[10px] font-mono uppercase tracking-wider font-bold py-1.5 px-3 rounded bg-primary text-primary-foreground hover:brightness-110 transition"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-semibold text-white text-sm">{item.name}</p>
                              <p className="text-[9px] text-muted-foreground uppercase font-mono tracking-wider">
                                {item.inputMethod.replace("_", " ")}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startRename(item)}
                              className="tool-icon h-7 w-7"
                              title="Rename Display"
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => duplicateDviItem(item)}
                              className="tool-icon h-7 w-7"
                              title="Duplicate Display"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => deleteDviItem(item.id)}
                              className="tool-icon h-7 w-7 hover:border-red-500 hover:text-red-500"
                              title="Delete Display"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-end border-t border-border/30 pt-2 text-[10px] font-mono">
                          <span className="text-muted-foreground truncate max-w-[180px]" title={item.parameters}>
                            {item.parameters}
                          </span>
                          <span className="text-primary font-bold">{item.pixels} px</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Total and Reset */}
                <div className="border-t border-border/40 pt-4 space-y-3">
                  <div className="flex justify-between items-center text-sm font-mono">
                    <span className="text-muted-foreground">Total DVI Pixels:</span>
                    <span className="text-white font-black text-lg">{formatNumber(totalDviPixels)} px</span>
                  </div>

                  {dviProjectItems.length > 0 && (
                    <button
                      onClick={clearDviProject}
                      className="w-full text-center py-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-red-400 transition"
                    >
                      Clear DVI Project
                    </button>
                  )}
                </div>
              </div>

              {/* DVI License Recommendation Card */}
              <LicenseRecommendation dviPixels={totalDviPixels} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ResultsList({ results }: { results: CalculationResults }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <div className="rounded-xl border border-border bg-ink p-4">
        <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          Total Pixels
        </span>
        <span className="mt-1 block font-mono text-sm font-semibold text-white truncate" title={String(results.pixels)}>
          {results.pixels} <span className="text-[10px] text-muted-foreground font-normal">px</span>
        </span>
      </div>
      <div className="rounded-xl border border-border bg-ink p-4">
        <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          Total Channels
        </span>
        <span className="mt-1 block font-mono text-sm font-semibold text-white truncate" title={String(results.channels)}>
          {results.channels} <span className="text-[10px] text-muted-foreground font-normal">ch</span>
        </span>
      </div>
      <div className="rounded-xl border border-border bg-ink p-4">
        <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          DMX Universes
        </span>
        <span className="mt-1 block font-mono text-sm font-semibold text-white truncate" title={String(results.universes)}>
          {results.universes} <span className="text-[10px] text-muted-foreground font-normal">U</span>
        </span>
      </div>
      <div className="rounded-xl border border-border bg-ink p-4">
        <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          Estimated Nebulas
        </span>
        <span className="mt-1 block font-mono text-sm font-semibold text-white truncate" title={String(results.nebulas)}>
          {results.nebulas} <span className="text-[10px] text-muted-foreground font-normal">Neb</span>
        </span>
      </div>
      <div className="rounded-xl border border-border bg-ink p-4 sm:col-span-2 sm:flex sm:flex-col sm:justify-center md:col-span-1">
        <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          Estimated Drives
        </span>
        <span className="mt-1 block font-mono text-sm font-semibold text-white truncate" title={String(results.drives)}>
          {results.drives} <span className="text-[10px] text-muted-foreground font-normal">Drv</span>
        </span>
      </div>
    </div>
  );
}

interface LicenseRecommendationProps {
  dmxChannels?: number;
  dviPixels?: number;
}

function LicenseRecommendation({ dmxChannels = 0, dviPixels = 0 }: LicenseRecommendationProps) {
  const license = matchLicense(dmxChannels, dviPixels);
  const isOver = !license && (dmxChannels > 0 || dviPixels > 0);

  const remainingDmx = license ? license.dmxCapacity - dmxChannels : 0;
  const utilizationDmx = license ? percent(dmxChannels, license.dmxCapacity) : 0;

  const remainingDvi = license ? license.dviCapacity - dviPixels : 0;
  const utilizationDvi = license ? percent(dviPixels, license.dviCapacity) : 0;

  const isDmxActive = dmxChannels > 0;
  const isDviActive = dviPixels > 0;

  return (
    <div className="rounded-xl border border-primary/20 bg-ink p-5">
      <div className="flex items-center gap-2">
        <Layers3 className="h-4 w-4 text-primary" />
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
          Recommended MADRIX License
        </p>
      </div>

      {isOver ? (
        <h4 className="mt-3 text-2xl font-black text-red-500">Exceeds Capacity</h4>
      ) : license ? (
        <h4 className="mt-3 text-2xl font-black text-white">{license.name}</h4>
      ) : (
        <h4 className="mt-3 text-2xl font-black text-muted-foreground">—</h4>
      )}

      {license && (
        <div className="mt-5 space-y-4 border-t border-border/50 pt-5 text-xs text-muted-foreground">
          {/* DMX Capacity Details */}
          {isDmxActive && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Supported DMX Capacity:</span>
                <span className="font-mono text-white font-semibold">
                  {formatNumber(license.dmxCapacity)} ch
                </span>
              </div>
              <div className="flex justify-between">
                <span>Required DMX Channels:</span>
                <span className="font-mono text-white font-semibold">
                  {formatNumber(dmxChannels)} ch
                </span>
              </div>
              <div className="flex justify-between">
                <span>Remaining Capacity:</span>
                <span className="font-mono text-white font-semibold">
                  {formatNumber(remainingDmx)} ch
                </span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-[10px] uppercase tracking-wider mb-1.5 font-mono">
                  <span>DMX Capacity Utilization</span>
                  <span className="text-primary font-bold">{utilizationDmx}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-border">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${Math.min(100, utilizationDmx)}%` }} />
                </div>
              </div>
            </div>
          )}

          {isDmxActive && isDviActive && <div className="border-t border-border/30 my-2" />}

          {/* DVI Capacity Details */}
          {isDviActive && (
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Supported DVI Capacity:</span>
                <span className="font-mono text-white font-semibold">
                  {formatNumber(license.dviCapacity)} px
                </span>
              </div>
              <div className="flex justify-between">
                <span>Required DVI Pixels:</span>
                <span className="font-mono text-white font-semibold">
                  {formatNumber(dviPixels)} px
                </span>
              </div>
              <div className="flex justify-between">
                <span>Remaining Capacity:</span>
                <span className="font-mono text-white font-semibold">
                  {formatNumber(remainingDvi)} px
                </span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-[10px] uppercase tracking-wider mb-1.5 font-mono">
                  <span>DVI Capacity Utilization</span>
                  <span className="text-primary font-bold">{utilizationDvi}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-border">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${Math.min(100, utilizationDvi)}%` }} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {isOver && (
        <p className="mt-3 text-xs leading-relaxed text-red-400">
          Required count ({isDmxActive && `${formatNumber(dmxChannels)} ch`}{isDmxActive && isDviActive && " / "}{isDviActive && `${formatNumber(dviPixels)} px`}) exceeds the capacity of the largest license.
        </p>
      )}
    </div>
  );
}
