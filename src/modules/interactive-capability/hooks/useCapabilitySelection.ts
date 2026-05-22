"use client";

import { useCallback, useMemo, useState } from "react";
import { resolveCapabilityState } from "../lib/resolve-card-state";
import type {
  CapabilityCardDefinition,
  ConfigTabId,
  InteractiveCapabilityModuleConfig,
  PrimaryTabId,
  ResolvedCardState,
  TabSelection,
} from "../types";

export interface UseCapabilitySelectionOptions {
  config: InteractiveCapabilityModuleConfig;
  initialSelection?: TabSelection;
}

export interface UseCapabilitySelectionResult {
  selection: TabSelection;
  setPrimary: (id: PrimaryTabId) => void;
  setConfig: (id: ConfigTabId) => void;
  resolveState: (card: CapabilityCardDefinition) => ResolvedCardState;
  leftCardStates: ResolvedCardState[];
  rightCardStates: ResolvedCardState[];
}

export function useCapabilitySelection({
  config,
  initialSelection,
}: UseCapabilitySelectionOptions): UseCapabilitySelectionResult {
  const [selection, setSelection] = useState<TabSelection>(
    initialSelection ?? config.defaultSelection
  );

  const setPrimary = useCallback((primary: PrimaryTabId) => {
    setSelection((prev) => ({ ...prev, primary }));
  }, []);

  const setConfig = useCallback((configId: ConfigTabId) => {
    setSelection((prev) => ({ ...prev, config: configId }));
  }, []);

  const resolveState = useCallback(
    (card: CapabilityCardDefinition): ResolvedCardState => ({
      cardId: card.id,
      state: resolveCapabilityState(card, selection),
    }),
    [selection]
  );

  const leftCardStates = useMemo(
    () => config.leftGrid.cards.map((card) => resolveState(card)),
    [config.leftGrid.cards, resolveState]
  );

  const rightCardStates = useMemo(
    () => config.rightGrid.cards.map((card) => resolveState(card)),
    [config.rightGrid.cards, resolveState]
  );

  return {
    selection,
    setPrimary,
    setConfig,
    resolveState,
    leftCardStates,
    rightCardStates,
  };
}
