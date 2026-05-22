"use client";

import { motion } from "framer-motion";
import { getHubCenter, getOrbitalCanvasSize, polarToCartesian } from "../../lib/orbital-position";
import { getLabelDensity } from "../../lib/capability-label-density";
import { CapabilityLabel } from "../CapabilityLabel";
import { getOrbitalCardVisualProps } from "../../lib/card-visual-props";
import type { OrbitalNodeDefinition } from "../../types/orbital";
import { useIsMounted } from "../../hooks/useIsMounted";
import { CapabilityIcon } from "../icons/CapabilityIcon";

export interface OrbitalCapabilityNodeProps {
  node: OrbitalNodeDefinition;
  index: number;
  hubSize: number;
  hubBleed?: number;
}

export function OrbitalCapabilityNode({
  node,
  index,
  hubSize,
  hubBleed = 0,
}: OrbitalCapabilityNodeProps) {
  const mounted = useIsMounted();
  const visual = getOrbitalCardVisualProps();
  const labelDensity = getLabelDensity(node.label);

  const canvas = getOrbitalCanvasSize(hubSize, hubBleed);
  const { x: cx, y: cy } = getHubCenter(hubSize, hubBleed);
  const { x, y } = polarToCartesian(node.angle, node.radius);
  const leftPct = ((cx + x) / canvas) * 100;
  const topPct = ((cy + y) / canvas) * 100;

  const floatDuration = 4.2 + (node.floatPhase ?? 0) * 1.2;
  const floatDelay = (node.floatPhase ?? 0) * 0.8;
  const floatY = 3 + (index % 3);

  return (
    <div
      data-orbital-node={node.id}
      className="icm-orbital-node"
      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
    >
      <motion.div
        className="icm-orbital-node__float"
        animate={mounted ? { y: [0, -floatY, 0] } : { y: 0 }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        whileHover={mounted ? { scale: 1.03 } : undefined}
      >
        <motion.article
          data-orbital-node-card
          data-orbital-static
          data-label-density={labelDensity}
          className="icm-orbital-node__card items-center overflow-visible"
          initial={false}
          animate={{
            opacity: visual.opacity,
            borderColor: visual.borderColor,
            backgroundColor: visual.backgroundColor,
            boxShadow: visual.boxShadow,
          }}
          transition={{
            duration: 0,
          }}
        >
          <div className="icm-capability-card__body">
            <CapabilityIcon
              name={node.icon ?? "enterprise"}
              data-card-icon
              className={`icm-capability-card__icon shrink-0 ${visual.textClass}`}
            />
            <CapabilityLabel
              label={node.label}
              className={`min-w-0 flex-1 ${visual.textClass}`}
            />
          </div>
        </motion.article>
      </motion.div>
    </div>
  );
}
