"use client";

import type { ConfigTabDefinition, ConfigTabId } from "../types";
import { TabChip } from "./TabChip";
import { TabSectionLabel } from "./TabSectionLabel";

export interface ConfigTabsProps {
  label: string;
  tabs: ConfigTabDefinition[];
  activeId: ConfigTabId;
  onChange: (id: ConfigTabId) => void;
}

export function ConfigTabs({ label, tabs, activeId, onChange }: ConfigTabsProps) {
  return (
    <section
      data-tab-control-group="config"
      className="icm-tab-control-group icm-tab-control-group--config"
    >
      <TabSectionLabel>{label}</TabSectionLabel>
      <div className="icm-tab-chip-row" role="tablist" aria-label={label}>
        {tabs.map((tab) => (
          <TabChip
            key={tab.id}
            isActive={tab.id === activeId}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
            {tab.count !== undefined && (
              <>
                <span className="text-white/60"> · </span>
                <span className="text-white/60">{tab.count}</span>
              </>
            )}
          </TabChip>
        ))}
      </div>
    </section>
  );
}
