"use client";

import { useSyncExternalStore } from "react";
import { ICM_FLUID_MAX, ICM_FLUID_MIN, ICM_REFERENCE_WIDTH } from "../config/fluid-scale";
import { roundCoord } from "../lib/round-coord";

function getScale(): number {
  if (typeof window === "undefined") return ICM_FLUID_MAX;
  const w = document.documentElement.clientWidth;
  return roundCoord(
    Math.min(ICM_FLUID_MAX, Math.max(ICM_FLUID_MIN, w / ICM_REFERENCE_WIDTH)),
    4
  );
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

/**
 * Escala fluida alineada con `--icm-fluid` en CSS (referencia 1920px).
 * Preferir tokens CSS; este hook queda para integraciones externas.
 */
export function useViewportScale(): number {
  return useSyncExternalStore(subscribe, getScale, () => ICM_FLUID_MAX);
}
