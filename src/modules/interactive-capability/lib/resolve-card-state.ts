import type {
  CapabilityCardDefinition,
  CapabilityVisualState,
  CentralNodeDefinition,
  SelectionKey,
  TabSelection,
} from "../types";
import { toSelectionKey } from "./selection-key";

function matchesSelection(
  keys: SelectionKey[],
  current: SelectionKey
): boolean {
  return keys.includes(current);
}

/**
 * Resolves visual state from card config + current tab selection.
 * Priority: highlighted > active > inactive. Cards always render.
 */
export function resolveCapabilityState(
  card: Pick<CapabilityCardDefinition, "activeWhen" | "highlightWhen">,
  selection: TabSelection
): CapabilityVisualState {
  const key = toSelectionKey(selection);

  if (matchesSelection(card.highlightWhen, key)) {
    return "highlighted";
  }
  if (matchesSelection(card.activeWhen, key)) {
    return "active";
  }
  return "inactive";
}

export function resolveCentralNodeState(
  node: CentralNodeDefinition,
  selection: TabSelection
): CapabilityVisualState {
  return resolveCapabilityState(node, selection);
}
