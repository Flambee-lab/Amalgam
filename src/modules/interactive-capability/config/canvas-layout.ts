/**
 * Medidas del artboard Figma (1920 × 1465).
 * Referencia proporcional — el runtime usa clamp/cqi en CSS, no estos px como fijos.
 */
export const FIGMA_CANVAS = {
  width: 1920,
  height: 1465,
} as const;

export const canvasLayout = {
  /** Ancho de referencia Figma; el módulo usa width 100% hasta este máximo */
  width: FIGMA_CANVAS.width,
  /** Altura de referencia; el layout crece con el contenido */
  referenceHeight: FIGMA_CANVAS.height,

  /** Márgenes horizontales del artboard (~60px en Figma) */
  paddingX: 60,

  /** Tab bar — offset superior */
  tabBarTop: 92,

  /** Grids laterales: 3 columnas × ~149.3px + gap 10.67px */
  sideGrid: {
    columns: 3,
    columnWidth: 149,
    gap: 10.664,
    /** 3×149 + 2×10.664 */
    width: 468.328,
  },

  /** Columnas del layout principal (480 + 837 + 480 + 120 pad ≈ 1920) */
  mainColumns: {
    left: 480,
    center: 837,
    right: 480,
  },

  /** Cards — Figma */
  card: {
    width: 149.297,
    borderRadius: 19.995,
    borderWidth: 1.333,
    padding: 10.664,
    gap: 10.664,
    maxHeight: 95,
    iconSize: 21.328,
    labelSize: 13.33,
    labelLineHeight: 15.996,
  },

  /** Headers de grid (Patient & Caregiver / HCP) */
  gridHeader: {
    titleSize: 26.66,
    channelSize: 21.328,
    subtitleSize: 21.328,
    iconBox: 79.98,
  },

  /** Zona central — Medical Grade AI */
  central: {
    aiNodeWidth: 218.613,
    aiNodeHeight: 197.285,
    enterpriseNodeWidth: 149.297,
    enterpriseNodeHeight: 86.645,
  },
} as const;
