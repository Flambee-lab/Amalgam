/** Primary audience tabs (Solutions for) */
export type PrimaryTabId = "caregivers" | "patients" | "hcps";

/** Market configuration tabs */
export type ConfigTabId = "config-a" | "config-b" | "custom";

/** Visual state resolved at render time — cards never unmount */
export type CapabilityVisualState = "inactive" | "active" | "highlighted";

/** Composite key for tab + config selection */
export type SelectionKey = `${PrimaryTabId}:${ConfigTabId}`;

export interface TabSelection {
  primary: PrimaryTabId;
  config: ConfigTabId;
}

export interface PrimaryTabDefinition {
  id: PrimaryTabId;
  label: string;
}

export interface ConfigTabDefinition {
  id: ConfigTabId;
  label: string;
  /** Optional count badge (e.g. "24") */
  count?: string | number;
}

export interface CapabilityCardDefinition {
  id: string;
  label: string;
  icon: string;
  /** Which primary+config combos mark this card as active (visible, no glow) */
  activeWhen: SelectionKey[];
  /** Which primary+config combos mark this card as highlighted */
  highlightWhen: SelectionKey[];
}

export interface CapabilityGridDefinition {
  id: string;
  title: string;
  subtitle?: string;
  channelLabel?: string;
  columns: number;
  cards: CapabilityCardDefinition[];
}

/** @deprecated Usar CentralHubDefinition + OrbitalNodeDefinition */
export interface CentralNodeDefinition {
  id: string;
  label: string;
  variant: "ai-core" | "enterprise";
  activeWhen: SelectionKey[];
  highlightWhen: SelectionKey[];
}

export interface ConnectionLineDefinition {
  id: string;
  path: string;
  activeWhen?: SelectionKey[];
}

export interface ModuleLabels {
  solutionsFor: string;
  marketConfigFor: string;
  regulatoryTitle: string;
  regulatorySubtitle: string;
}

export interface InteractiveCapabilityModuleConfig {
  labels: ModuleLabels;
  primaryTabs: PrimaryTabDefinition[];
  configTabs: ConfigTabDefinition[];
  leftGrid: CapabilityGridDefinition;
  rightGrid: CapabilityGridDefinition;
  centralHub: import("./orbital").CentralHubDefinition;
  defaultSelection: TabSelection;
}

export type {
  OrbitalNodeDefinition,
  CentralCoreDefinition,
  CentralHubDefinition,
  CentralHubLayoutDefinition,
  OrbitalBackgroundDefinition,
} from "./orbital";

export interface ResolvedCardState {
  cardId: string;
  state: CapabilityVisualState;
}
