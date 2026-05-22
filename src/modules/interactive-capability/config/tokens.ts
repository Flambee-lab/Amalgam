/**
 * Design tokens — align with Figma variables when assets are wired.
 * Glows use box-shadow / opacity layers (no PNG illumination).
 */
import { FIGMA_CANVAS, canvasLayout } from "./canvas-layout";

export const capabilityTokens = {
  canvas: FIGMA_CANVAS,
  layout: canvasLayout,
  colors: {
    canvas: "#040217",
    purple: "#d912f7",
    teal: "#25c1b5",
    /** Stroke en reposo — grids laterales (Figma) */
    cardBorderRest: "#14163C",
    cardBorderLegacy: "#2d3374",
    cardBorder: "#14163C",
    cardBorderActive: "#14163C",
    cardLabel: "#c3cbff",
    cardWidth: 149,
    cardMaxHeight: 95,
    cardLabelSize: 13,
    cardBorderHighlightPurple: "#d912f7",
    cardBorderHighlightTeal: "#25c1b5",
    textMuted: "#c3cbff",
    textTeal: "#a8e6e1",
    textTealBright: "#74d7cf",
    tabBorder: "rgba(255,255,255,0.2)",
    tabBorderActive: "#E674FA",
    /** Fondo REST y ACTIVE — mismo canvas */
    tabBackground: "#040217",
    cardBorderHighlight: "#FFFFFF",
  },
  surfaces: {
    /** REST — tabs y cards no seleccionadas / no highlighted */
    cardRest: "#040217",
    cardActive: "#040217",
    cardHighlighted: "#1D1B2E",
  },
  shadows: {
    cardHighlightWhite: "0 0 40px rgba(255, 255, 255, 0.49)",
    orbitalCardTeal: "0 0 40px rgba(37, 193, 181, 0.4)",
    tabActive: "0 0 14px rgba(230, 116, 250, 0.22)",
  },
  typography: {
    tabSectionLabel: "36px",
    tabChip: "26px",
    tabChipHeight: "70px",
    tabDividerWidth: "80px",
  },
  motion: {
    duration: 0.42,
    interactionDuration: 0.26,
    ease: [0.22, 1, 0.36, 1] as const,
  },
  opacity: {
    /** REST — label celestito al 100%; no atenuar la tipografía */
    inactive: 1,
    active: 1,
    highlighted: 1,
  },
} as const;

export type GlowVariant = "purple" | "teal" | "none";

export const glowByVariant: Record<
  GlowVariant,
  { border: string; shadow: string; halo?: string }
> = {
  none: { border: capabilityTokens.colors.cardBorderLegacy, shadow: "none" },
  purple: {
    border: capabilityTokens.colors.cardBorderHighlightPurple,
    shadow: "0 0 20px rgba(217, 18, 247, 0.4)",
    halo: "0 0 40px rgba(217, 18, 247, 0.25)",
  },
  teal: {
    border: capabilityTokens.colors.cardBorderHighlightTeal,
    shadow: "0 0 20px rgba(37, 193, 181, 0.4)",
    halo: "0 0 40px rgba(37, 193, 181, 0.3)",
  },
};
