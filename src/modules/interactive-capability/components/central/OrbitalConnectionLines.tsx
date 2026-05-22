"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { buildCircuitPathSets } from "../../lib/orbital-circuit-paths";
import { useIsMounted } from "../../hooks/useIsMounted";
import type { TabSelection } from "../../types";
import type { OrbitalNodeDefinition } from "../../types/orbital";

export interface OrbitalConnectionLinesProps {
  nodes: OrbitalNodeDefinition[];
  hubSize: number;
  hubBleed?: number;
  coreWidth: number;
  coreHeight: number;
  nodeWidth: number;
  nodeHeight: number;
  selection: TabSelection;
}

export function OrbitalConnectionLines({
  nodes,
  hubSize,
  hubBleed = 0,
  coreWidth,
  coreHeight,
  nodeWidth,
  nodeHeight,
}: OrbitalConnectionLinesProps) {
  const mounted = useIsMounted();
  const canvasSize = hubSize + 2 * hubBleed;

  const circuitSets = useMemo(
    () =>
      buildCircuitPathSets(
        nodes,
        hubSize,
        coreWidth,
        coreHeight,
        nodeWidth,
        nodeHeight,
        hubBleed
      ),
    [nodes, hubSize, hubBleed, coreWidth, coreHeight, nodeWidth, nodeHeight]
  );

  return (
    <svg
      className="icm-orbital-lines"
      viewBox={`0 0 ${canvasSize} ${canvasSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id="orbital-circuit-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#d912f7" stopOpacity="0.2" />
          <stop offset="45%" stopColor="#d912f7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#7a12c9" stopOpacity="0.35" />
        </linearGradient>
        <filter
          id="orbital-circuit-glow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {circuitSets.flatMap((set) =>
        set.paths.map((d, lineIndex) =>
          mounted ? (
            <motion.path
              key={`${set.id}-${lineIndex}`}
              d={d}
              stroke="url(#orbital-circuit-gradient)"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#orbital-circuit-glow)"
              initial={false}
              animate={{ opacity: [0.3, 0.65, 0.3] }}
              transition={{
                opacity: {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: lineIndex * 0.15,
                },
              }}
            />
          ) : (
            <path
              key={`${set.id}-${lineIndex}`}
              d={d}
              stroke="url(#orbital-circuit-gradient)"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#orbital-circuit-glow)"
              opacity={0.45}
            />
          )
        )
      )}
    </svg>
  );
}
