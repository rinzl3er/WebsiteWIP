import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export type Material = {
  id: string;
  displayName: string;
  category: string;
  subcategory: string;
  absorption: {
    125: number;
    250: number;
    500: number;
    1000: number;
    2000: number;
    4000: number;
  };
  nrc: number;
};

export type GroupedMaterials = Record<string, Material[]>;

let cachedLibrary: { materials: Material[]; groupedMaterials: GroupedMaterials } | null = null;

export function getMaterialLibrary() {
  if (cachedLibrary) return cachedLibrary;

  const csvPath = path.join(process.cwd(), 'app/tools/acoustics/materialdata/absorption-coefficients.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');

  const { data } = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
  });

  const materials: Material[] = data.map((row: any) => {
    // Parse coefficients, defaulting to 0 if missing or invalid
    const parseCoeff = (val: string) => {
      const num = parseFloat(val);
      return isNaN(num) ? 0 : num;
    };

    const material: Material = {
      id: row.id || '',
      displayName: row.name || 'Unnamed Material',
      category: row.category || 'Uncategorized',
      subcategory: row.subcategory || 'General',
      absorption: {
        125: parseCoeff(row.a125),
        250: parseCoeff(row.a250),
        500: parseCoeff(row.a500),
        1000: parseCoeff(row.a1000),
        2000: parseCoeff(row.a2000),
        4000: parseCoeff(row.a4000),
      },
      nrc: parseCoeff(row.NRC),
    };
    return material;
  });

  const groupedMaterials = materials.reduce((acc, material) => {
    if (!acc[material.category]) {
      acc[material.category] = [];
    }
    acc[material.category].push(material);
    return acc;
  }, {} as GroupedMaterials);

  cachedLibrary = { materials, groupedMaterials };
  return cachedLibrary;
}
