import type { SelectionKey } from "./index";

/** Nodo flotante en órbita — posición por ángulo (°) y radio (px @ scale 1) */
export interface OrbitalNodeDefinition {
  id: string;
  label: string;
  icon?: string;
  /** 0° = derecha, 90° = abajo, -90° = arriba (sentido horario matemático) */
  angle: number;
  /** Distancia del centro al centro del nodo */
  radius: number;
  /** Desfase de animación float (0–1) */
  floatPhase?: number;
  activeWhen: SelectionKey[];
  highlightWhen: SelectionKey[];
}

export interface CentralCoreDefinition {
  id: string;
  label: string;
  titleLines: string[];
  /** Asset de la esfera central (reemplaza el placeholder SVG) */
  sphereSrc?: string;
  activeWhen: SelectionKey[];
  highlightWhen: SelectionKey[];
}

export interface OrbitalBackgroundDefinition {
  /** Footprint lógico del hub (649 Figma) — define escala del layer */
  width: number;
  height: number;
  /** Dimensiones nativas del asset (p. ej. 1024×1024) */
  intrinsicWidth?: number;
  intrinsicHeight?: number;
  /** URL del marco orbital (reemplaza hexágono / wireframe SVG) */
  assetSrc: string;
}

/** Conectores / ramas desde el centro del hub (p. ej. this.svg) */
export interface HubBranchDefinition {
  assetSrc: string;
  intrinsicWidth: number;
  intrinsicHeight: number;
  /** Origen en coords del SVG — donde convergen las ramas (nodo guía / esfera) */
  anchorX: number;
  anchorY: number;
}

export interface CentralHubLayoutDefinition {
  /** Contenedor cuadrado del hub (649 Figma) */
  hubSize: number;
  /** Margen para nodos/líneas que sobresalen del marco 649 */
  hubBleed?: number;
  background: OrbitalBackgroundDefinition;
  /** Ramas laterales ancladas al centro del core (debajo de todo el hub) */
  branchesLeft?: HubBranchDefinition;
  core: CentralCoreDefinition;
  coreWidth: number;
  coreHeight: number;
  orbitalNodeWidth: number;
  orbitalNodeHeight: number;
}

export interface CentralHubDefinition {
  layout: CentralHubLayoutDefinition;
  orbitalNodes: OrbitalNodeDefinition[];
}
