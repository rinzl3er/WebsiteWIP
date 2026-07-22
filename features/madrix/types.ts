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
