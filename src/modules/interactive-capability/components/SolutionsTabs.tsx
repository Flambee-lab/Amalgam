"use client";

import type { PrimaryTabDefinition, PrimaryTabId } from "../types";
import { TabChip } from "./TabChip";
import { TabSectionLabel } from "./TabSectionLabel";

export interface SolutionsTabsProps {
  label: string;
  tabs: PrimaryTabDefinition[];
  activeId: PrimaryTabId;
  onChange: (id: PrimaryTabId) => void;
}

export function SolutionsTabs({
  label,
  tabs,
  activeId,
  onChange,
}: SolutionsTabsProps) {
  return (
    <section data-tab-control-group className="icm-tab-control-group">
      <TabSectionLabel>{label}</TabSectionLabel>
      <div className="icm-tab-chip-row" role="tablist" aria-label={label}>
        {tabs.map((tab) => (
          <TabChip
            key={tab.id}
            isActive={tab.id === activeId}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </TabChip>
        ))}
      </div>
    </section>
  );
}
