import { FIGMA_CANVAS } from "./canvas-layout";

/** Ancho de referencia Figma — proporciones, no tamaños absolutos en runtime */
export const ICM_REFERENCE_WIDTH = FIGMA_CANVAS.width;

/** Primer breakpoint responsive — tipografía y densidad de cajas (1280 pendiente) */
export const ICM_VIEWPORT_NARROW = 1440;

/** Escala fluida continua — `clamp(0.45, 100vw / 1920, 1)` (layout estructural aparte en 1024px) */
export const ICM_FLUID_MIN = 0.45;
export const ICM_FLUID_MAX = 1;

/** Labels dentro de capability cards — 15.5px @ 1920, 10px @ 1440 */
export const ICM_CARD_LABEL_SIZE_WIDE = 15.5;
export const ICM_CARD_LABEL_SIZE_NARROW = 10;
export const ICM_ORBITAL_LABEL_SIZE_WIDE = 14.5;

/** Ratios de proporción derivados del artboard (sin unidades) */
export const icmRatios = {
  card: { w: 149, h: 95, aspect: 149 / 95 },
  orbitalNode: { w: 149, h: 86, aspect: 149 / 86 },
  core: { w: 218, h: 197, aspect: 218 / 197 },
  sideGrid: { w: 468.328, cols: 3 },
  mainColumns: { left: 480, center: 837, right: 480 },
} as const;
