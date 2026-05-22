"use client";

import type { CapabilityGridDefinition, CapabilityVisualState } from "../types";
import { CapabilityCard } from "./CapabilityCard";
import { CapabilityIcon } from "./icons/CapabilityIcon";

export interface CapabilityGridProps {
  grid: CapabilityGridDefinition;
  getState: (cardId: string) => CapabilityVisualState;
  accent?: "purple" | "teal";
  side: "left" | "right";
}

export function CapabilityGrid({
  grid,
  getState,
  accent = "purple",
  side,
}: CapabilityGridProps) {
  const isLeft = side === "left";

  return (
    <section
      data-side-grid={side}
      className="flex w-full min-w-0 max-w-full flex-col gap-4 overflow-visible"
      aria-labelledby={`${grid.id}-title`}
    >
      <header className="flex w-full min-w-0 max-w-full flex-col items-end gap-1 overflow-hidden text-right">
        <div className="flex max-w-full min-w-0 items-center gap-3">
          <div
            data-grid-header-icon
            className="flex shrink-0 items-center justify-center rounded-[20px] border border-amalgam-card-border bg-amalgam-canvas"
          >
            <CapabilityIcon
              name="capability"
              className="icm-header-capability-icon text-amalgam-text-muted"
            />
          </div>
          <div className="flex min-w-0 flex-col items-end">
            <h2
              id={`${grid.id}-title`}
              data-grid-title
              className="max-w-full font-sans font-medium leading-tight text-white"
            >
              {grid.title}
            </h2>
            {grid.channelLabel && (
              <p
                data-grid-channel
                className="font-sans font-medium leading-tight text-white"
              >
                {grid.channelLabel}
              </p>
            )}
          </div>
        </div>
        {grid.subtitle && (
          <p
            data-grid-subtitle
            className="font-sans font-normal leading-tight text-amalgam-text-muted"
          >
            {grid.subtitle}
          </p>
        )}
      </header>

      <div data-card-grid className="grid w-full min-w-0 max-w-full">
        {grid.cards.map((card) => (
          <CapabilityCard
            key={card.id}
            label={card.label}
            icon={card.icon}
            state={getState(card.id)}
            accent={accent}
          />
        ))}
      </div>
    </section>
  );
}
