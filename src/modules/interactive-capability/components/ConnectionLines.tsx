"use client";

import { motion } from "framer-motion";
import { toSelectionKey } from "../lib/selection-key";
import type { ConnectionLineDefinition, TabSelection } from "../types";
import { capabilityTokens } from "../config/tokens";

export interface ConnectionLinesProps {
  lines: ConnectionLineDefinition[];
  selection: TabSelection;
  className?: string;
}

export function ConnectionLines({
  lines,
  selection,
  className,
}: ConnectionLinesProps) {
  const currentKey = toSelectionKey(selection);

  return (
    <svg
      className={className}
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="line-gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d912f7" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#d912f7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#3801b7" stopOpacity="0.2" />
        </linearGradient>
        <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Decorative ambient ring */}
      <ellipse
        cx="300"
        cy="200"
        rx="220"
        ry="140"
        stroke="url(#line-gradient-purple)"
        strokeWidth="1"
        strokeOpacity="0.25"
      />

      {lines.map((line) => {
        const isActive =
          !line.activeWhen?.length ||
          line.activeWhen.includes(currentKey);

        return (
          <motion.path
            key={line.id}
            d={line.path}
            stroke="url(#line-gradient-purple)"
            strokeWidth={isActive ? 2 : 1}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            filter={isActive ? "url(#line-glow)" : undefined}
            initial={false}
            animate={{
              opacity: isActive ? 0.9 : 0.2,
              pathLength: isActive ? 1 : 0.65,
            }}
            transition={{
              duration: capabilityTokens.motion.duration,
              ease: capabilityTokens.motion.ease,
            }}
          />
        );
      })}
    </svg>
  );
}
