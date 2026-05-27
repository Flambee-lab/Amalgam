"use client";

import "../styles/module.css";
import { useMemo, type CSSProperties } from "react";
import { useViewportScale } from "../hooks/useViewportScale";
import { defaultModuleConfig } from "../config/module-data";
import { useCapabilitySelection } from "../hooks/useCapabilitySelection";
import type { InteractiveCapabilityModuleConfig } from "../types";
import { ModuleScaleRoot } from "./ModuleScaleRoot";
import { ModuleTabBar } from "./ModuleTabBar";
import { CapabilityGrid } from "./CapabilityGrid";
import { CentralHub } from "./central";

export interface InteractiveCapabilityModuleProps {
  config?: InteractiveCapabilityModuleConfig;
  className?: string;
}

export function InteractiveCapabilityModule({
  config = defaultModuleConfig,
  className,
}: InteractiveCapabilityModuleProps) {
  const {
    selection,
    setPrimary,
    setConfig,
    resolveState,
    leftCardStates,
    rightCardStates,
  } = useCapabilitySelection({ config });

  const stateById = useMemo(() => {
    const map = new Map<string, ReturnType<typeof resolveState>["state"]>();
    [...leftCardStates, ...rightCardStates].forEach((s) =>
      map.set(s.cardId, s.state)
    );
    return map;
  }, [leftCardStates, rightCardStates]);

  const getState = (cardId: string) => stateById.get(cardId) ?? "inactive";
  const fluidScale = useViewportScale();

  return (
    <ModuleScaleRoot className={className}>
      <div
        className="w-full min-w-0 bg-amalgam-canvas text-white"
        data-module="interactive-capability"
        style={{ "--icm-fluid": fluidScale } as CSSProperties}
      >
        <ModuleTabBar
          solutionsLabel={config.labels.solutionsFor}
          marketConfigLabel={config.labels.marketConfigFor}
          primaryTabs={config.primaryTabs}
          configTabs={config.configTabs}
          activePrimary={selection.primary}
          activeConfig={selection.config}
          onPrimaryChange={setPrimary}
          onConfigChange={setConfig}
        />

        <div data-section="module-main">
          <CapabilityGrid
            grid={config.leftGrid}
            getState={getState}
            accent="purple"
            side="left"
          />

          <CentralHub hub={config.centralHub} selection={selection} />

          <CapabilityGrid
            grid={config.rightGrid}
            getState={getState}
            accent="purple"
            side="right"
          />
        </div>
      </div>
    </ModuleScaleRoot>
  );
}
