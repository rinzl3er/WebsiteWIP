import type { MadrixLicense } from "./types";

// Publicly documented MADRIX 5 output capacities. Kept as application data,
// independent of any manufacturer fixture profiles or proprietary assets.
export const MADRIX_LICENSES: MadrixLicense[] = [
  { name: "MADRIX 5 start", dmxCapacity: 1_024, dviCapacity: 16_384 },
  { name: "MADRIX 5 entry", dmxCapacity: 6_144, dviCapacity: 262_144 },
  { name: "MADRIX 5 basic", dmxCapacity: 16_384, dviCapacity: 1_048_576 },
  { name: "MADRIX 5 professional", dmxCapacity: 65_536, dviCapacity: 2_097_152 },
  { name: "MADRIX 5 ultimate", dmxCapacity: 262_144, dviCapacity: 2_097_152 },
  { name: "MADRIX 5 maximum", dmxCapacity: 1_048_576, dviCapacity: 2_097_152 },
];
