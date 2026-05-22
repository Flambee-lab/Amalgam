"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { capabilityTokens } from "../config/tokens";

export interface TabChipProps {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

const { colors, shadows, motion: motionTokens } = capabilityTokens;

/** Chip selector — REST #040217; ACTIVE stroke #E674FA + glow sutil */
export function TabChip({
  isActive,
  onClick,
  children,
  className,
}: TabChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      data-tab-chip
      data-tab-chip-active={isActive ? "" : undefined}
      className={[
        "relative z-[2] inline-flex min-w-0 cursor-pointer items-center justify-center",
        "border border-solid",
        "font-sans font-medium leading-none text-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      initial={false}
      animate={{
        backgroundColor: colors.tabBackground,
        borderColor: isActive ? colors.tabBorderActive : colors.tabBorder,
        boxShadow: isActive ? shadows.tabActive : "none",
      }}
      whileHover={{
        borderColor: isActive ? colors.tabBorderActive : "rgba(255,255,255,0.35)",
      }}
      whileTap={{ scale: 0.995 }}
      transition={{
        duration: motionTokens.interactionDuration,
        ease: motionTokens.ease,
      }}
    >
      <span className="relative z-[1] whitespace-nowrap">{children}</span>
    </motion.button>
  );
}
