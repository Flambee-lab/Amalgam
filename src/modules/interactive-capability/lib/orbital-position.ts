import { roundCoord } from "./round-coord";

export interface OrbitalCartesian {
  x: number;
  y: number;
}

/**
 * Convierte coordenadas polares (ángulo en grados, radio en px) a offset cartesiano
 * desde el centro del hub. 0° apunta a la derecha; 90° hacia abajo (eje Y+).
 */
export function polarToCartesian(
  angleDeg: number,
  radius: number
): OrbitalCartesian {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: roundCoord(Math.cos(rad) * radius),
    y: roundCoord(Math.sin(rad) * radius),
  };
}

export function getOrbitalCanvasSize(hubSize: number, bleed = 0): number {
  return hubSize + 2 * bleed;
}

/** Centro del canvas orbital (coincide con el centro del marco 649) */
export function getHubCenter(hubSize: number, bleed = 0): OrbitalCartesian {
  const canvas = getOrbitalCanvasSize(hubSize, bleed);
  return { x: roundCoord(canvas / 2), y: roundCoord(canvas / 2) };
}
