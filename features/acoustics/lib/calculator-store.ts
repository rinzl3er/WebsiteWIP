import { create } from 'zustand';

export type Treatment = {
  id: string;
  materialId: string;
  area: number;
};

export type SurfaceState = {
  materialId: string;
  customArea?: number;
  treatments: Treatment[];
};

export type CalculatorState = {
  roomShape: string;
  geometry: Record<string, number>;
  surfaces: Record<string, SurfaceState>;

  setRoomShape: (shape: string) => void;
  setGeometry: (key: string, value: number) => void;
  setSurfaceMaterial: (surface: string, materialId: string) => void;
  setSurfaceArea: (surface: string, area: number | undefined) => void;
  addTreatment: (surface: string) => void;
  updateTreatment: (surface: string, treatmentId: string, updates: Partial<{ materialId: string; area: number }>) => void;
  removeTreatment: (surface: string, treatmentId: string) => void;
};

const initialSurfaces: Record<string, SurfaceState> = {
  Floor: { materialId: '', treatments: [] },
  Walls: { materialId: '', treatments: [] },
  Ceiling: { materialId: '', treatments: [] },
  Doors: { materialId: '', treatments: [] },
  Windows: { materialId: '', treatments: [] },
};

export const useCalculatorStore = create<CalculatorState>((set) => ({
  roomShape: 'Standard Room',
  geometry: {
    length: 0,
    width: 0,
    height: 0,
    height1: 0,
    height2: 0,
    volume: 0,
    floor_area: 0,
    wall_area: 0,
    ceiling_area: 0,
  },
  surfaces: initialSurfaces,

  setRoomShape: (shape) => set({ roomShape: shape }),
  
  setGeometry: (key, value) => set((state) => ({
    geometry: { ...state.geometry, [key]: value }
  })),

  setSurfaceMaterial: (surface, materialId) => set((state) => ({
    surfaces: {
      ...state.surfaces,
      [surface]: { ...state.surfaces[surface], materialId }
    }
  })),

  setSurfaceArea: (surface, area) => set((state) => ({
    surfaces: {
      ...state.surfaces,
      [surface]: { ...state.surfaces[surface], customArea: area }
    }
  })),

  addTreatment: (surface) => set((state) => ({
    surfaces: {
      ...state.surfaces,
      [surface]: {
        ...state.surfaces[surface],
        treatments: [
          ...state.surfaces[surface].treatments,
          { id: Math.random().toString(36).substr(2, 9), materialId: '', area: 0 }
        ]
      }
    }
  })),

  updateTreatment: (surface, treatmentId, updates) => set((state) => ({
    surfaces: {
      ...state.surfaces,
      [surface]: {
        ...state.surfaces[surface],
        treatments: state.surfaces[surface].treatments.map(t => 
          t.id === treatmentId ? { ...t, ...updates } : t
        )
      }
    }
  })),

  removeTreatment: (surface, treatmentId) => set((state) => ({
    surfaces: {
      ...state.surfaces,
      [surface]: {
        ...state.surfaces[surface],
        treatments: state.surfaces[surface].treatments.filter(t => t.id !== treatmentId)
      }
    }
  })),
}));
