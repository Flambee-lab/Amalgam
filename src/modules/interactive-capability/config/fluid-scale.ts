import { FIGMA_CANVAS } from "./canvas-layout";

/** Ancho de referencia Figma — proporciones, no tamaños absolutos en runtime */
export const ICM_REFERENCE_WIDTH = FIGMA_CANVAS.width;

/** Escala fluida equivalente a `clamp(0.68, 100vw / 1920, 1)` */
export const ICM_FLUID_MIN = 0.68;
export const ICM_FLUID_MAX = 1;

/** Ratios de proporción derivados del artboard (sin unidades) */
export const icmRatios = {
  card: { w: 149, h: 95, aspect: 149 / 95 },
  orbitalNode: { w: 149, h: 86, aspect: 149 / 86 },
  core: { w: 218, h: 197, aspect: 218 / 197 },
  sideGrid: { w: 468.328, cols: 3 },
  mainColumns: { left: 480, center: 837, right: 480 },
} as const;
