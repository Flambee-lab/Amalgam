"use client";

import { motion } from "framer-motion";
import type { CapabilityVisualState } from "../../types";
import type { CentralCoreDefinition } from "../../types/orbital";
import { getCardVisualProps } from "../../lib/card-visual-props";
import { capabilityTokens } from "../../config/tokens";
import { useIsMounted } from "../../hooks/useIsMounted";
import { CapabilityIcon } from "../icons/CapabilityIcon";

export interface CentralCoreNodeProps {
  core: CentralCoreDefinition;
  state: CapabilityVisualState;
}

export function CentralCoreNode({ core, state }: CentralCoreNodeProps) {
  const mounted = useIsMounted();
  const visual = getCardVisualProps(state, "purple", "side");
  const transition = {
    duration: capabilityTokens.motion.interactionDuration,
    ease: capabilityTokens.motion.ease,
  };

  return (
    <motion.article
      data-central-core
      data-capability-state={state}
      className="icm-central-core"
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
      <div className="icm-central-core__body">
        {core.sphereSrc ? (
          <motion.div
            className="icm-central-core__logo-wrap"
            animate={
              mounted && visual.isHighlighted
                ? { scale: [1, 1.03, 1] }
                : { scale: 1 }
            }
            transition={{
              duration: 2.8,
              repeat: visual.isHighlighted ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <img
              src={core.sphereSrc}
              alt=""
              aria-hidden
              className="icm-central-core__logo"
              width={48}
              height={48}
              decoding="async"
            />
          </motion.div>
        ) : (
          <div className="icm-central-core__logo-wrap">
            <CapabilityIcon name="ai-core" className="icm-central-core__logo" />
          </div>
        )}
        <p
          className={`icm-central-core__title relative z-10 font-sans font-semibold ${visual.textClass}`}
        >
          {core.titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < core.titleLines.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </motion.article>
  );
}
