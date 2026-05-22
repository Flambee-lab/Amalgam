"use client";

import { motion } from "framer-motion";
import type { CapabilityVisualState, CentralNodeDefinition } from "../types";
import { getCardVisualProps } from "../lib/card-visual-props";
import { capabilityTokens } from "../config/tokens";
import { CapabilityIcon } from "./icons/CapabilityIcon";

export interface CentralNodeProps {
  node: CentralNodeDefinition;
  state: CapabilityVisualState;
}

export function CentralNode({ node, state }: CentralNodeProps) {
  const isCore = node.variant === "ai-core";
  const accent = isCore ? "purple" : "teal";
  const visual = getCardVisualProps(state, accent, "central");
  const transition = {
    duration: capabilityTokens.motion.interactionDuration,
    ease: capabilityTokens.motion.ease,
  };

  if (isCore) {
    return (
      <motion.div
        data-central-node="ai"
        className="relative z-20 mx-auto flex w-full min-w-0 flex-col items-center justify-center justify-self-center border border-amalgam-purple bg-amalgam-canvas shadow-glow-purple-sm"
        animate={{
          borderColor: capabilityTokens.colors.cardBorderHighlightPurple,
          boxShadow: "0 0 20px rgba(217, 18, 247, 0.4)",
        }}
        transition={{
          duration: capabilityTokens.motion.duration,
          ease: capabilityTokens.motion.ease,
        }}
      >
        <motion.div
          className="relative icm-ai-orb"
          animate={{ scale: state === "highlighted" ? [1, 1.04, 1] : 1 }}
          transition={{
            duration: 2.4,
            repeat: state === "highlighted" ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <CapabilityIcon name="ai-core" className="size-full" />
        </motion.div>
        <p className="icm-ai-label text-center font-sans font-medium text-amalgam-purple leading-tight">
          Medical
          <br />
          Grade AI
        </p>
      </motion.div>
    );
  }

  return (
    <motion.article
      data-central-node
      className="relative z-10 mx-auto flex min-h-0 min-w-0 items-center justify-self-center border border-solid bg-amalgam-canvas"
      animate={{
        opacity: visual.opacity,
        borderColor: visual.borderColor,
        backgroundColor: visual.backgroundColor,
        boxShadow: visual.boxShadow,
      }}
      transition={transition}
    >
      {visual.isHighlighted && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius: "inherit",
            background:
              "radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.08) 0%, transparent 65%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition}
        />
      )}
      <CapabilityIcon
        name="enterprise"
        data-card-icon
        className={`relative z-10 shrink-0 ${visual.textClass}`}
      />
      <p
        className={`relative z-10 min-w-0 flex-1 font-sans font-semibold ${visual.textClass}`}
      >
        {node.label}
      </p>
    </motion.article>
  );
}
