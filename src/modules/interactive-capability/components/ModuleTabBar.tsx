"use client";

import type { ConfigTabDefinition, ConfigTabId, PrimaryTabDefinition, PrimaryTabId } from "../types";
import { SolutionsTabs } from "./SolutionsTabs";
import { ConfigTabs } from "./ConfigTabs";

export interface ModuleTabBarProps {
  solutionsLabel: string;
  marketConfigLabel: string;
  primaryTabs: PrimaryTabDefinition[];
  configTabs: ConfigTabDefinition[];
  activePrimary: PrimaryTabId;
  activeConfig: ConfigTabId;
  onPrimaryChange: (id: PrimaryTabId) => void;
  onConfigChange: (id: ConfigTabId) => void;
}

export function ModuleTabBar({
  solutionsLabel,
  marketConfigLabel,
  primaryTabs,
  configTabs,
  activePrimary,
  activeConfig,
  onPrimaryChange,
  onConfigChange,
}: ModuleTabBarProps) {
  return (
    <div data-section="module-tab-bar" className="icm-tab-bar font-sans">
      <div className="icm-tab-bar__inner">
        <SolutionsTabs
          label={solutionsLabel}
          tabs={primaryTabs}
          activeId={activePrimary}
          onChange={onPrimaryChange}
        />

        <div className="icm-tab-bar__divider" aria-hidden />

        <ConfigTabs
          label={marketConfigLabel}
          tabs={configTabs}
          activeId={activeConfig}
          onChange={onConfigChange}
        />
      </div>
    </div>
  );
}
