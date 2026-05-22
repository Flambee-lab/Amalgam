import { formatCoord } from "./round-coord";
import { polarToCartesian, getHubCenter } from "./orbital-position";
import type { OrbitalNodeDefinition } from "../types/orbital";

export interface OrbitalSpoke {
  id: string;
  path: string;
}

/** Genera líneas radiales del core a cada nodo orbital */
export function buildOrbitalSpokes(
  nodes: OrbitalNodeDefinition[],
  hubSize: number,
  scale: number
): OrbitalSpoke[] {
  const center = getHubCenter(hubSize);

  return nodes.map((node) => {
    const { x, y } = polarToCartesian(node.angle, node.radius * scale);
    const endX = roundCoordSum(center.x, x);
    const endY = roundCoordSum(center.y, y);

    return {
      id: `spoke-${node.id}`,
      path: `M ${formatCoord(center.x)} ${formatCoord(center.y)} L ${formatCoord(endX)} ${formatCoord(endY)}`,
    };
  });
}

function roundCoordSum(a: number, b: number): number {
  return Math.round((a + b) * 100) / 100;
}
