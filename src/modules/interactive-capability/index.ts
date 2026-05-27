export { InteractiveCapabilityModule } from "./components/InteractiveCapabilityModule";
export type { InteractiveCapabilityModuleProps } from "./components/InteractiveCapabilityModule";

export { SolutionsTabs } from "./components/SolutionsTabs";
export { ConfigTabs } from "./components/ConfigTabs";
export { ModuleTabBar } from "./components/ModuleTabBar";
export { ModuleScaleRoot } from "./components/ModuleScaleRoot";
export { useViewportScale } from "./hooks/useViewportScale";
export { TabChip } from "./components/TabChip";
export { TabSectionLabel } from "./components/TabSectionLabel";
export { CapabilityGrid } from "./components/CapabilityGrid";
export { CapabilityCard } from "./components/CapabilityCard";
export { CentralHub } from "./components/central";
export { CentralCoreNode } from "./components/central/CentralCoreNode";
export {
  OrbitalBackground,
  DEFAULT_ORBITAL_BACKGROUND_SRC,
} from "./components/central/OrbitalBackground";
export { OrbitalCapabilityNode } from "./components/central/OrbitalCapabilityNode";
export { OrbitalConnectionLines } from "./components/central/OrbitalConnectionLines";
/** @deprecated Grid layout — usar CentralHub */
export { CentralNode } from "./components/CentralNode";
export { ConnectionLines } from "./components/ConnectionLines";

export { defaultModuleConfig } from "./config/module-data";
export { capabilityTokens } from "./config/tokens";
export { FIGMA_CANVAS, canvasLayout } from "./config/canvas-layout";
export {
  ICM_REFERENCE_WIDTH,
  ICM_VIEWPORT_NARROW,
  ICM_FLUID_MIN,
  ICM_FLUID_MAX,
  ICM_CARD_LABEL_SIZE_WIDE,
  ICM_CARD_LABEL_SIZE_NARROW,
  ICM_ORBITAL_LABEL_SIZE_WIDE,
  icmRatios,
} from "./config/fluid-scale";
export { defaultCentralHub, orbitalNodesConfig } from "./config/orbital-layout";
export { polarToCartesian, getHubCenter } from "./lib/orbital-position";
export { buildOrbitalSpokes } from "./lib/orbital-connections";
export { buildCircuitPathSets } from "./lib/orbital-circuit-paths";

export { useCapabilitySelection } from "./hooks/useCapabilitySelection";
export {
  resolveCapabilityState,
  resolveCentralNodeState,
} from "./lib/resolve-card-state";
export { toSelectionKey } from "./lib/selection-key";

export type {
  CapabilityVisualState,
  CapabilityCardDefinition,
  CapabilityGridDefinition,
  CentralNodeDefinition,
  ConfigTabDefinition,
  ConfigTabId,
  ConnectionLineDefinition,
  OrbitalNodeDefinition,
  CentralHubDefinition,
  CentralCoreDefinition,
  InteractiveCapabilityModuleConfig,
  PrimaryTabDefinition,
  PrimaryTabId,
  SelectionKey,
  TabSelection,
} from "./types";
