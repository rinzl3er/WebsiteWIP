"use client";

import { useMemo, useState } from "react";
import { Layers3, Settings, Zap } from "lucide-react";

import {
  calculateLedStrip,
  calculatePixelFixture,
  matchLicense,
  percent,
  formatNumber,
} from "@/features/madrix/calculator";
import type { StripType, CalculationResults } from "@/features/madrix/types";

export function MadrixCalculator() {
  // LED Strip Calculator States
  const [stripType, setStripType] = useState<StripType>("rgbw");
  const [stripLength, setStripLength] = useState<string>("10");

  // Pixel Calculator States
  const [pixelCount, setPixelCount] = useState<string>("150");
  const [channelsPerPixel, setChannelsPerPixel] = useState<string>("3");

  // Calculations
  const stripResults = useMemo(() => {
    const len = parseFloat(stripLength);
    return calculateLedStrip(Number.isFinite(len) && len >= 0 ? len : 0, stripType);
  }, [stripLength, stripType]);

  const pixelResults = useMemo(() => {
    const pix = parseFloat(pixelCount);
    const ch = parseFloat(channelsPerPixel);
    return calculatePixelFixture(
      Number.isFinite(pix) && pix >= 0 ? pix : 0,
      Number.isFinite(ch) && ch >= 0 ? ch : 0
    );
  }, [pixelCount, channelsPerPixel]);

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
              <h2 className="mt-2 text-3xl font-bold">DMX Estimators</h2>
            </div>
            <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-xs text-primary">
              Independent Calculators
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* LED Strip Calculator Card */}
            <div className="rounded-2xl border border-border bg-ink-soft p-6 sm:p-8 flex flex-col justify-between hover:border-primary/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-2.5">
                  <Zap className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold text-white">LED Strip Calculator</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select a predefined LED strip spec and enter the length in meters to calculate system outputs.
                </p>

                {/* Inputs */}
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
                      placeholder="e.g. 10"
                      className="tool-input"
                    />
                  </label>
                </div>

                {/* Results Area */}
                <div className="border-t border-border/40 pt-6">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-4 font-bold">
                    Calculation Results
                  </h4>
                  <ResultsList results={stripResults} />
                </div>
              </div>

              {/* License recommendation */}
              <div className="mt-8 border-t border-border/40 pt-6">
                <LicenseRecommendation dmxChannels={stripResults.channels} />
              </div>
            </div>

            {/* Pixel Calculator Card */}
            <div className="rounded-2xl border border-border bg-ink-soft p-6 sm:p-8 flex flex-col justify-between hover:border-primary/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-2.5">
                  <Settings className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold text-white">Pixel Calculator</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter custom pixels and channel specifications to calculate system outputs.
                </p>

                {/* Inputs */}
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
                      placeholder="e.g. 150"
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
                      placeholder="e.g. 3"
                      className="tool-input"
                    />
                  </label>
                </div>

                {/* Results Area */}
                <div className="border-t border-border/40 pt-6">
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary mb-4 font-bold">
                    Calculation Results
                  </h4>
                  <ResultsList results={pixelResults} />
                </div>
              </div>

              {/* License recommendation */}
              <div className="mt-8 border-t border-border/40 pt-6">
                <LicenseRecommendation dmxChannels={pixelResults.channels} />
              </div>
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
  dmxChannels: number;
  dviPixels?: number;
}

function LicenseRecommendation({ dmxChannels, dviPixels = 0 }: LicenseRecommendationProps) {
  const license = matchLicense(dmxChannels, dviPixels);
  const isOver = !license && (dmxChannels > 0 || dviPixels > 0);

  const remainingDmx = license ? license.dmxCapacity - dmxChannels : 0;
  const utilizationDmx = license ? percent(dmxChannels, license.dmxCapacity) : 100;

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
        <div className="mt-5 space-y-3.5 border-t border-border/50 pt-5 text-xs text-muted-foreground">
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
              <span>Capacity Utilization</span>
              <span className="text-primary font-bold">{utilizationDmx}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-border">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${Math.min(100, utilizationDmx)}%` }} />
            </div>
          </div>
        </div>
      )}

      {isOver && (
        <p className="mt-3 text-xs leading-relaxed text-red-400">
          Required channel count ({formatNumber(dmxChannels)} ch) exceeds the capacity of the largest license.
        </p>
      )}
    </div>
  );
}
