import { formatCoord, roundCoord } from "./round-coord";
import { polarToCartesian } from "./orbital-position";
import type { OrbitalNodeDefinition } from "../types/orbital";

export interface CircuitPathSet {
  id: string;
  paths: [string, string, string];
}

interface Point {
  x: number;
  y: number;
}

/** Punto en el borde del core hacia el nodo */
function getCoreAttachPoint(
  cx: number,
  cy: number,
  halfW: number,
  halfH: number,
  angleDeg: number
): Point {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);
  const t = Math.min(
    dx !== 0 ? Math.abs(halfW / dx) : Infinity,
    dy !== 0 ? Math.abs(halfH / dy) : Infinity
  );
  return {
    x: roundCoord(cx + dx * t),
    y: roundCoord(cy + dy * t),
  };
}

/** Salida del nodo hacia el centro (borde interior) */
function getNodeExitPoint(
  nx: number,
  ny: number,
  halfW: number,
  halfH: number,
  angleDeg: number
): Point {
  const rad = (angleDeg * Math.PI) / 180;
  const dirX = -Math.cos(rad);
  const dirY = -Math.sin(rad);
  return {
    x: roundCoord(nx + dirX * halfW * 0.92),
    y: roundCoord(ny + dirY * halfH * 0.92),
  };
}

/** Codo estilo PCB / octágono Figma */
function getElbowPoint(start: Point, attach: Point, angleDeg: number): Point {
  const a = ((angleDeg % 360) + 360) % 360;

  if (a > 315 || a <= 45) {
    return { x: attach.x, y: start.y };
  }
  if (a > 45 && a <= 135) {
    return { x: start.x, y: attach.y };
  }
  if (a > 135 && a <= 225) {
    return { x: attach.x, y: start.y };
  }
  return { x: start.x, y: attach.y };
}

function pointsToPath(points: Point[]): string {
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${formatCoord(p.x)} ${formatCoord(p.y)}`)
    .join(" ");
}

/** Desplaza todas las aristas en perpendicular al ángulo del nodo */
function parallelOffset(points: Point[], angleDeg: number, offset: number): string {
  if (offset === 0) return pointsToPath(points);
  const perp = ((angleDeg + 90) * Math.PI) / 180;
  const ox = Math.cos(perp) * offset;
  const oy = Math.sin(perp) * offset;
  return pointsToPath(
    points.map((p) => ({
      x: roundCoord(p.x + ox),
      y: roundCoord(p.y + oy),
    }))
  );
}

/**
 * Tres líneas paralelas estilo Figma (circuit traces) por nodo orbital.
 */
export function buildCircuitPathSets(
  nodes: OrbitalNodeDefinition[],
  hubSize: number,
  coreWidth: number,
  coreHeight: number,
  nodeWidth: number,
  nodeHeight: number,
  hubBleed = 0
): CircuitPathSet[] {
  const canvas = hubSize + 2 * hubBleed;
  const cx = roundCoord(canvas / 2);
  const cy = roundCoord(canvas / 2);
  const halfW = roundCoord(coreWidth / 2);
  const halfH = roundCoord(coreHeight / 2);
  const nHalfW = roundCoord(nodeWidth / 2);
  const nHalfH = roundCoord(nodeHeight / 2);
  const lineGap = 4;

  return nodes.map((node) => {
    const { x, y } = polarToCartesian(node.angle, node.radius);
    const nx = roundCoord(cx + x);
    const ny = roundCoord(cy + y);

    const start = getNodeExitPoint(nx, ny, nHalfW, nHalfH, node.angle);
    const attach = getCoreAttachPoint(cx, cy, halfW, halfH, node.angle);
    const elbow = getElbowPoint(start, attach, node.angle);

    const basePoints = [start, elbow, attach];

    return {
      id: node.id,
      paths: [
        parallelOffset(basePoints, node.angle, -lineGap),
        parallelOffset(basePoints, node.angle, 0),
        parallelOffset(basePoints, node.angle, lineGap),
      ],
    };
  });
}
