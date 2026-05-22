import type { ConfigTabId, PrimaryTabId, SelectionKey, TabSelection } from "../types";

export function toSelectionKey(selection: TabSelection): SelectionKey {
  return `${selection.primary}:${selection.config}`;
}

export function parseSelectionKey(key: SelectionKey): TabSelection {
  const [primary, config] = key.split(":") as [PrimaryTabId, ConfigTabId];
  return { primary, config };
}
