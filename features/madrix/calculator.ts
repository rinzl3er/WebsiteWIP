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
  const universes = channels / 512;
  const nebulas = universes / 12;
  const drives = (length * 14) / 300;

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
  const universes = channels / 512;
  const nebulas = universes / 12;
  const drives = pixels / 100;

  return {
    pixels,
    channels,
    universes,
    nebulas,
    drives,
  };
};

export const matchLicense = (dmx: number, dvi: number = 0): MadrixLicense | undefined =>
  MADRIX_LICENSES.find((license) => dmx <= license.dmxCapacity && dvi <= license.dviCapacity);

export const percent = (value: number, capacity: number) =>
  capacity === 0 ? 0 : Math.min(100, (value / capacity) * 100);

export const formatNumber = (value: number) => new Intl.NumberFormat("en-US").format(value);
