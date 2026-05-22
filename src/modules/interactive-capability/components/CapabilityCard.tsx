"use client";

import { motion } from "framer-motion";
import type { CapabilityVisualState } from "../types";
import { getLabelDensity } from "../lib/capability-label-density";
import { getCardVisualProps } from "../lib/card-visual-props";
import { capabilityTokens } from "../config/tokens";
import { CapabilityIcon } from "./icons/CapabilityIcon";
import { CapabilityLabel } from "./CapabilityLabel";

export interface CapabilityCardProps {
  label: string;
  icon: string;
  state: CapabilityVisualState;
  accent?: "purple" | "teal";
}

export function CapabilityCard({
  label,
  icon,
  state,
  accent = "purple",
}: CapabilityCardProps) {
  const visual = getCardVisualProps(state, accent);
  const labelDensity = getLabelDensity(label);
  const transition = {
    duration: capabilityTokens.motion.interactionDuration,
    ease: capabilityTokens.motion.ease,
  };

  return (
    <motion.article
      layout
      data-capability-card
      data-capability-state={state}
      data-label-density={labelDensity}
      className="icm-capability-card relative z-0 flex min-h-0 min-w-0 items-center justify-center overflow-visible border border-solid"
      animate={{
        opacity: visual.opacity,
        borderColor: visual.borderColor,
        backgroundColor: visual.backgroundColor,
        boxShadow: visual.boxShadow,
        zIndex: visual.isHighlighted ? 2 : 0,
      }}
      transition={transition}
      whileHover={{ scale: 1.01, zIndex: visual.isHighlighted ? 2 : 1 }}
    >
      {visual.isHighlighted && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ borderRadius: "inherit" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        >
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "inherit",
              background:
                "radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.08) 0%, transparent 65%)",
            }}
          />
        </motion.div>
      )}
      <div className="icm-capability-card__body">
        <CapabilityIcon
          name={icon}
          data-card-icon
          className={`icm-capability-card__icon relative z-10 shrink-0 ${visual.textClass}`}
        />
        <CapabilityLabel
          label={label}
          className={`relative z-10 min-w-0 flex-1 ${visual.textClass}`}
        />
      </div>
    </motion.article>
  );
}
