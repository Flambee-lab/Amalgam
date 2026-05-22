"use client";

import type { CSSProperties } from "react";
import type { TabSelection } from "../../types";
import type { CentralHubDefinition } from "../../types/orbital";
import { resolveCapabilityState } from "../../lib/resolve-card-state";
import { OrbitalBackground } from "./OrbitalBackground";
import { HubBranchLayer } from "./HubBranchLayer";
import { OrbitalCapabilityNode } from "./OrbitalCapabilityNode";
import { CentralCoreNode } from "./CentralCoreNode";
import { CapabilityIcon } from "../icons/CapabilityIcon";

export interface CentralHubProps {
  hub: CentralHubDefinition;
  selection: TabSelection;
  regulatoryTitle: string;
  regulatorySubtitle: string;
}

export function CentralHub({
  hub,
  selection,
  regulatoryTitle,
  regulatorySubtitle,
}: CentralHubProps) {
  const { layout, orbitalNodes } = hub;
  const coreState = resolveCapabilityState(layout.core, selection);

  return (
    <div data-zone="central" className="icm-central-zone">
      {/* Conectores (this.svg) — overlay centrado en el núcleo orbital */}
      {layout.branchesLeft && (
        <div className="icm-central-zone__branches icm-central-zone__branches--left">
          <HubBranchLayer branch={layout.branchesLeft} side="left" />
        </div>
      )}

      <div
        className="icm-central-hub"
        style={
          {
            "--icm-hub-size": layout.hubSize,
            "--icm-hub-bleed": layout.hubBleed ?? 0,
            "--icm-core-w": layout.coreWidth,
            "--icm-core-h": layout.coreHeight,
            "--icm-orbital-node-w": layout.orbitalNodeWidth,
            "--icm-orbital-node-h": layout.orbitalNodeHeight,
          } as CSSProperties
        }
      >
        {/* Layer 1 — Background orbital graphic */}
        <div className="icm-central-hub__layer icm-central-hub__layer--background">
          <OrbitalBackground config={layout.background} />
        </div>

        {/* Layer 2 — Floating orbital nodes (trazas en slide.svg, sin líneas SVG duplicadas) */}
        <div className="icm-central-hub__layer icm-central-hub__layer--nodes">
          {orbitalNodes.map((node, index) => (
            <OrbitalCapabilityNode
              key={node.id}
              node={node}
              index={index}
              hubSize={layout.hubSize}
              hubBleed={layout.hubBleed}
            />
          ))}
        </div>

        {/* Layer 3 — Main AI core */}
        <div className="icm-central-hub__layer icm-central-hub__layer--core">
          <CentralCoreNode core={layout.core} state={coreState} />
        </div>

        {/* Capa flotante — no participa del flujo / centrado del hub */}
        <div
          className="icm-regulatory-footer"
          aria-label={`${regulatoryTitle} ${regulatorySubtitle}`}
        >
          <div className="icm-regulatory-footer__icon">
            <CapabilityIcon name="regulatory" className="size-full text-amalgam-canvas" />
          </div>
          <p className="icm-regulatory-footer__text font-sans font-medium text-amalgam-teal">
            {regulatoryTitle}
            <br />
            {regulatorySubtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
