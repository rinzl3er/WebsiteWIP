"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { Material, GroupedMaterials } from '@/features/acoustics/lib/material-parser';

interface MaterialContextType {
  materials: Material[];
  groupedMaterials: GroupedMaterials;
}

const MaterialContext = createContext<MaterialContextType | null>(null);

export function MaterialProvider({
  children,
  materials,
  groupedMaterials,
}: {
  children: ReactNode;
  materials: Material[];
  groupedMaterials: GroupedMaterials;
}) {
  return (
    <MaterialContext.Provider value={{ materials, groupedMaterials }}>
      {children}
    </MaterialContext.Provider>
  );
}

export function useMaterials() {
  const context = useContext(MaterialContext);
  if (!context) {
    throw new Error('useMaterials must be used within a MaterialProvider');
  }
  return context;
}
