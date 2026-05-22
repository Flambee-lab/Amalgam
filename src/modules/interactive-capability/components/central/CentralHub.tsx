"use client";

import type { CSSProperties } from "react";
import type { TabSelection } from "../../types";
import type { CentralHubDefinition } from "../../types/orbital";
import { resolveCapabilityState } from "../../lib/resolve-card-state";
import { OrbitalBackground } from "./OrbitalBackground";
import { HubBranchLayer } from "./HubBranchLayer";
import { OrbitalCapabilityNode } from "./OrbitalCapabilityNode";
import { CentralCoreNode } from "./CentralCoreNode";

export interface CentralHubProps {
  hub: CentralHubDefinition;
  selection: TabSelection;
}

export function CentralHub({ hub, selection }: CentralHubProps) {
  const { layout, orbitalNodes } = hub;
  const coreState = resolveCapabilityState(layout.core, selection);

  return (
    <div data-zone="central" className="icm-central-zone">
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
        <div className="icm-central-hub__layer icm-central-hub__layer--background">
          <OrbitalBackground config={layout.background} />
        </div>

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

        <div className="icm-central-hub__layer icm-central-hub__layer--core">
          <CentralCoreNode core={layout.core} state={coreState} />
        </div>
      </div>
    </div>
  );
}
