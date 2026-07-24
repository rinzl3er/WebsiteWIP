import { MADRIX_LICENSES } from "./licenses";
import type { StripType, StripSpec, CalculationResults, MadrixLicense } from "./types";

export const STRIP_SPECS: Record<StripType, StripSpec> = {
  rgbw: {
    name: "RGBW Strip",
    pixelsPerMeter: 20,
    channelsPerPixel: 4,
  },
  rgb_60: {
    name: "RGB 60 LED",
    pixelsPerMeter: 20,
    channelsPerPixel: 3,
  },
  rgb_30: {
    name: "RGB 30 LED",
    pixelsPerMeter: 10,
    channelsPerPixel: 3,
  },
};

export const calculateLedStrip = (length: number, type: StripType): CalculationResults => {
  const spec = STRIP_SPECS[type];
  const pixels = length * spec.pixelsPerMeter;
  const channels = pixels * spec.channelsPerPixel;
  const universes = Math.ceil(channels / 512);
  const nebulas = Math.ceil(universes / 12);
  const drives = Math.ceil((length * 14) / 300);

  return {
    pixels,
    channels,
    universes,
    nebulas,
    drives,
  };
};

export const calculatePixelFixture = (pixels: number, channelsPerPixel: number): CalculationResults => {
  const channels = pixels * channelsPerPixel;
  const universes = Math.ceil(channels / 512);
  const nebulas = Math.ceil(universes / 12);
  const drives = Math.ceil(pixels / 100);

  return {
    pixels,
    channels,
    universes,
    nebulas,
    drives,
  };
};

// Size unit to mm conversion factors
export const SIZE_UNIT_FACTORS: Record<string, number> = {
  m: 1000,
  dm: 100,
  cm: 10,
  mm: 1,
  inch: 25.4,
  foot: 304.8,
  yard: 914.4,
};

// Area unit to mm2 conversion factors
export const AREA_UNIT_FACTORS: Record<string, number> = {
  m2: 1000000,
  dm2: 10000,
  cm2: 100,
  mm2: 1,
  in2: 645.16,
  ft2: 92903.04,
  yd2: 836127.36,
};

export const calculateDviResolution = (x: number, y: number, z: number, count: number): number => {
  return x * y * z * count;
};

export const calculateDviArea = (area: number, unit: string, pitch: number): number => {
  if (pitch <= 0) return 0;
  const factor = AREA_UNIT_FACTORS[unit] ?? 1;
  const areaMm2 = area * factor;
  return areaMm2 / (pitch * pitch);
};

export const calculateDviFixtureSize = (w: number, h: number, unit: string, pitch: number, count: number): number => {
  if (pitch <= 0) return 0;
  const factor = SIZE_UNIT_FACTORS[unit] ?? 1;
  const wMm = w * factor;
  const hMm = h * factor;
  return (wMm / pitch) * (hMm / pitch) * count;
};

export const calculateDviPixelCount = (count: number, fixtureCount: number): number => {
  return count * fixtureCount;
};

export const matchLicense = (dmx: number, dvi: number = 0): MadrixLicense | undefined =>
  MADRIX_LICENSES.find((license) => dmx <= license.dmxCapacity && dvi <= license.dviCapacity);

export const percent = (value: number, capacity: number) =>
  capacity === 0 ? 0 : Math.min(100, (value / capacity) * 100);

export const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);
