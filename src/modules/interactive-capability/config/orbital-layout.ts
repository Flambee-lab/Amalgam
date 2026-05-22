import type { CentralHubDefinition, OrbitalNodeDefinition } from "../types/orbital";
import type { SelectionKey } from "../types";

const sel = (
  primary: "caregivers" | "patients" | "hcps",
  config: "config-a" | "config-b" | "custom"
): SelectionKey => `${primary}:${config}`;

const ALL_PRIMARY = ["caregivers", "patients", "hcps"] as const;
const ALL_CONFIG = ["config-a", "config-b", "custom"] as const;

function allCombinations(): SelectionKey[] {
  return ALL_PRIMARY.flatMap((p) =>
    ALL_CONFIG.map((c) => sel(p, c))
  );
}

/**
 * Posiciones orbitales calibradas al frame Figma (imagen 2).
 * angle: 0° = derecha, 90° = abajo, -90° = arriba
 */
const orbitalNodesBase: OrbitalNodeDefinition[] = [
  {
    id: "integrations",
    label: "Integrations & Ecosystem",
    icon: "enterprise",
    angle: -90,
    radius: 232,
    floatPhase: 0,
    activeWhen: [],
    highlightWhen: [],
  },
  {
    id: "support",
    label: "Support Services",
    icon: "enterprise",
    angle: -42,
    radius: 248,
    floatPhase: 0.12,
    activeWhen: [],
    highlightWhen: [],
  },
  {
    id: "localization",
    label: "Localization",
    icon: "enterprise",
    angle: 4,
    radius: 262,
    floatPhase: 0.28,
    activeWhen: [],
    highlightWhen: [],
  },
  {
    id: "multi-brand",
    label: "Multi-Brand Support",
    icon: "enterprise",
    angle: 52,
    radius: 248,
    floatPhase: 0.45,
    activeWhen: [],
    highlightWhen: [],
  },
  {
    id: "more",
    label: "More...",
    icon: "enterprise",
    angle: 128,
    radius: 242,
    floatPhase: 0.58,
    activeWhen: [],
    highlightWhen: [],
  },
  {
    id: "admin",
    label: "Admin",
    icon: "enterprise",
    angle: 182,
    radius: 258,
    floatPhase: 0.72,
    activeWhen: [],
    highlightWhen: [],
  },
  {
    id: "reporting",
    label: "Reporting and Insights.",
    icon: "enterprise",
    angle: -138,
    radius: 246,
    floatPhase: 0.88,
    activeWhen: [],
    highlightWhen: [],
  },
];

/** Nodos orbitales — estado visual fijo; no reaccionan a tabs laterales */
export const orbitalNodesConfig: OrbitalNodeDefinition[] = orbitalNodesBase;

export const defaultCentralHub: CentralHubDefinition = {
  layout: {
    hubSize: 649,
    hubBleed: 76,
    background: {
      width: 649,
      height: 649,
      intrinsicWidth: 733,
      intrinsicHeight: 733,
      assetSrc: "/images/slide.svg",
    },
    branchesLeft: {
      assetSrc: "/images/this.svg",
      intrinsicWidth: 1651,
      intrinsicHeight: 967,
      /** Convergencia central — alineado al núcleo / slide.svg (825, 477 Figma) */
      anchorX: 827.509,
      anchorY: 477.321,
    },
    core: {
      id: "medical-grade-ai",
      label: "Medical Grade AI",
      titleLines: ["Medical", "Grade AI"],
      sphereSrc: "/images/medical-grade-ai-sphere.png",
      activeWhen: allCombinations(),
      highlightWhen: [],
    },
    coreWidth: 218,
    coreHeight: 197,
    orbitalNodeWidth: 149,
    orbitalNodeHeight: 86,
  },
  orbitalNodes: orbitalNodesConfig,
};
