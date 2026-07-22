export type StripType = "rgbw" | "rgb_60" | "rgb_30";

export interface StripSpec {
  name: string;
  pixelsPerMeter: number;
  channelsPerPixel: number;
}

export interface CalculationResults {
  pixels: number;
  channels: number;
  universes: number;
  nebulas: number;
  drives: number;
}

export type MadrixLicense = {
  name: string;
  dmxCapacity: number;
  dviCapacity: number;
};

export type DviInputMethod = "resolution" | "area" | "fixture_size" | "pixel_count";

export interface DviProjectItem {
  id: string;
  name: string;
  inputMethod: DviInputMethod;
  pixels: number;
  parameters: string;
  rawInputs: {
    resolution?: { x: string; y: string; z: string; count: string };
    area?: { val: string; unit: string; pitch: string };
    fixtureSize?: { w: string; h: string; unit: string; pitch: string; count: string };
    pixelCount?: { count: string; fixtureCount: string };
  };
}
