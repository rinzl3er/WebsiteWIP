import { Material } from './material-parser';
import { CalculatorState, SurfaceState } from './calculator-store';

export type CalculatedGeometry = {
  volume: number;
  floorArea: number;
  ceilingArea: number;
  wallArea: number; // Gross wall area
  netWallArea: number; // Wall area minus doors and windows
  doorArea: number;
  windowArea: number;
  totalSurfaceArea: number;
};

export type FrequencyBands = 125 | 250 | 500 | 1000 | 2000 | 4000;
export const BANDS: FrequencyBands[] = [125, 250, 500, 1000, 2000, 4000];

export function computeGeometry(state: CalculatorState): CalculatedGeometry {
  const g = state.geometry;
  let volume = 0, floorArea = 0, ceilingArea = 0, wallArea = 0;

  if (state.roomShape === 'Standard Room') {
    const { length = 0, width = 0, height = 0 } = g;
    floorArea = length * width;
    ceilingArea = floorArea;
    wallArea = 2 * (length * height) + 2 * (width * height);
    volume = floorArea * height;
  } else if (state.roomShape === 'Sloped Ceiling') {
    const { length = 0, width = 0, height1 = 0, height2 = 0 } = g;
    floorArea = length * width;
    const slopeLength = Math.sqrt(Math.pow(width, 2) + Math.pow(height2 - height1, 2));
    ceilingArea = length * slopeLength;
    // Two rectangular side walls (H1 and H2), two trapezoidal end walls
    wallArea = (length * height1) + (length * height2) + (width * (height1 + height2));
    volume = floorArea * ((height1 + height2) / 2);
  } else if (state.roomShape === 'Vaulted Ceiling') {
    const { length = 0, width = 0, height1 = 0, height2 = 0 } = g;
    floorArea = length * width;
    const slopeLength = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height2 - height1, 2));
    ceilingArea = 2 * (length * slopeLength);
    // Two rectangular side walls (H1), two gable end walls
    wallArea = 2 * (length * height1) + (width * (height1 + height2));
    volume = floorArea * ((height1 + height2) / 2);
  } else if (state.roomShape === 'Custom Room') {
    volume = g.volume || 0;
    floorArea = g.floor_area || 0;
    ceilingArea = g.ceiling_area || 0;
    wallArea = g.wall_area || 0;
  }

  // Calculate door and window areas from surfaces if customArea is set, else 0
  const getSurfaceArea = (s: SurfaceState, defaultArea: number) => 
    s.customArea !== undefined && s.customArea !== null && !isNaN(s.customArea) ? Number(s.customArea) : defaultArea;

  // For base surfaces, we use the custom area if set, otherwise the geometric area.
  const finalFloorArea = getSurfaceArea(state.surfaces['Floor'], floorArea);
  const finalCeilingArea = getSurfaceArea(state.surfaces['Ceiling'], ceilingArea);
  
  // Doors and Windows are subtractive from walls. They default to 0 area unless customArea is provided.
  const doorArea = getSurfaceArea(state.surfaces['Doors'], 0);
  const windowArea = getSurfaceArea(state.surfaces['Windows'], 0);

  // The base wall area is the geometric wall area, OR the custom wall area if overridden.
  const baseWallArea = getSurfaceArea(state.surfaces['Walls'], wallArea);
  const netWallArea = Math.max(0, baseWallArea - doorArea - windowArea);

  const totalSurfaceArea = finalFloorArea + finalCeilingArea + netWallArea + doorArea + windowArea;

  return {
    volume,
    floorArea: finalFloorArea,
    ceilingArea: finalCeilingArea,
    wallArea: baseWallArea,
    netWallArea,
    doorArea,
    windowArea,
    totalSurfaceArea
  };
}

export function computeTotalAbsorption(
  state: CalculatorState,
  geom: CalculatedGeometry,
  materialLibrary: Material[]
): Record<FrequencyBands, number> {
  const absorption = { 125: 0, 250: 0, 500: 0, 1000: 0, 2000: 0, 4000: 0 };

  const getMat = (id: string) => materialLibrary.find(m => m.id === id);

  const addAbsorption = (area: number, matId: string) => {
    if (area <= 0 || !matId) return;
    const mat = getMat(matId);
    if (!mat) return;
    BANDS.forEach(band => {
      absorption[band] += area * (mat.absorption[band] || 0);
    });
  };

  // Base surfaces
  addAbsorption(geom.floorArea, state.surfaces['Floor'].materialId);
  addAbsorption(geom.ceilingArea, state.surfaces['Ceiling'].materialId);
  addAbsorption(geom.netWallArea, state.surfaces['Walls'].materialId);
  addAbsorption(geom.doorArea, state.surfaces['Doors'].materialId);
  addAbsorption(geom.windowArea, state.surfaces['Windows'].materialId);

  // Treatments
  Object.values(state.surfaces).forEach(surface => {
    surface.treatments.forEach(t => {
      addAbsorption(t.area || 0, t.materialId);
    });
  });

  return absorption;
}

export function calculateSabine(volume: number, absorption: Record<FrequencyBands, number>): Record<FrequencyBands, number> {
  const rt60 = { 125: 0, 250: 0, 500: 0, 1000: 0, 2000: 0, 4000: 0 };
  if (volume <= 0) return rt60;

  BANDS.forEach(band => {
    const A = absorption[band];
    rt60[band] = A > 0 ? (0.161 * volume) / A : 0;
  });
  return rt60;
}

export function calculateEyring(
  volume: number,
  totalArea: number,
  absorption: Record<FrequencyBands, number>
): Record<FrequencyBands, number> {
  const rt60 = { 125: 0, 250: 0, 500: 0, 1000: 0, 2000: 0, 4000: 0 };
  if (volume <= 0 || totalArea <= 0) return rt60;

  BANDS.forEach(band => {
    const A = absorption[band];
    const alphaAvg = A / totalArea;
    if (alphaAvg <= 0) {
      rt60[band] = 0;
    } else if (alphaAvg >= 1) {
      rt60[band] = 0; // Infinite absorption = 0 reverb
    } else {
      rt60[band] = (0.161 * volume) / (-totalArea * Math.log(1 - alphaAvg));
    }
  });
  return rt60;
}
