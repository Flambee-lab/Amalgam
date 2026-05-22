import type { CSSProperties } from "react";
import type { HubBranchDefinition } from "../../types/orbital";

export interface HubBranchLayerProps {
  branch: HubBranchDefinition;
  side: "left" | "right";
}

/**
 * Ramas direccionales desde el centro del hub.
 * El anchor del SVG coincide con el centro de la ilustración / esfera.
 */
export function HubBranchLayer({ branch, side }: HubBranchLayerProps) {
  const anchorXRatio = branch.anchorX / branch.intrinsicWidth;
  const anchorYRatio = branch.anchorY / branch.intrinsicHeight;

  return (
    <div
      className={`icm-hub-branch icm-hub-branch--${side}`}
      style={
        {
          "--icm-branch-anchor-x": anchorXRatio,
          "--icm-branch-anchor-y": anchorYRatio,
          "--icm-branch-intrinsic-w": branch.intrinsicWidth,
          "--icm-branch-intrinsic-h": branch.intrinsicHeight,
        } as CSSProperties
      }
      aria-hidden
    >
      <img
        src={branch.assetSrc}
        alt=""
        className="icm-hub-branch__asset"
        width={branch.intrinsicWidth}
        height={branch.intrinsicHeight}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
