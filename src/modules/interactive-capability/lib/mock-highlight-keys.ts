import type { ConfigTabId, PrimaryTabId, SelectionKey } from "../types";
import { parseSelectionKey } from "./selection-key";

const sel = (
  primary: PrimaryTabId,
  config: ConfigTabId
): SelectionKey => `${primary}:${config}`;

const ALL_PRIMARY: PrimaryTabId[] = ["caregivers", "patients", "hcps"];
const ALL_CONFIG: ConfigTabId[] = ["config-a", "config-b", "custom"];

/**
 * Combinaciones donde la card recibe highlight (glow blanco).
 * Depende de primary + config + índice — demo temporal.
 */
export function mockHighlightWhenForCard(
  index: number,
  side: "left" | "right"
): SelectionKey[] {
  const keys = new Set<SelectionKey>();

  ALL_PRIMARY.forEach((primary, pi) => {
    ALL_CONFIG.forEach((config, ci) => {
      const bias = side === "right" ? 11 : 0;
      const score = (index + bias + pi * 5 + ci * 3) % 9;
      const primaryMatch =
        (primary === "caregivers" && score < 4) ||
        (primary === "patients" && score >= 2 && score < 7) ||
        (primary === "hcps" && (side === "right" ? score >= 1 : score === 4));

      const configMatch =
        (config === "config-a" && index % 2 === 0) ||
        (config === "config-b" && index % 3 !== 1) ||
        (config === "custom" && (index + pi) % 4 === 0);

      if (primaryMatch && configMatch) {
        keys.add(sel(primary, config));
      }
    });
  });

  return [...keys];
}

/**
 * Combinaciones donde la card está "activa" (opacidad plena, sin glow).
 * Más amplio que highlight: misma audiencia o misma config que algún highlight de la card.
 */
export function mockActiveWhenForCard(
  index: number,
  side: "left" | "right"
): SelectionKey[] {
  const highlights = mockHighlightWhenForCard(index, side);
  if (highlights.length === 0) return [];

  const keys = new Set<SelectionKey>();
  highlights.forEach((key) => {
    const { primary, config } = parseSelectionKey(key);
    ALL_CONFIG.forEach((c) => keys.add(sel(primary, c)));
    ALL_PRIMARY.forEach((p) => keys.add(sel(p, config)));
  });

  return [...keys];
}
