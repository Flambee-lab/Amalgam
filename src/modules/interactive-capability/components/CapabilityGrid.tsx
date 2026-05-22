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
      <header
        data-side-grid-header
        className={`icm-side-grid-header icm-side-grid-header--${side}`}
      >
        <div className="icm-side-grid-header__row">
          {isLeft && (
            <div
              data-grid-header-icon
              className="icm-side-grid-header__icon flex shrink-0 items-center justify-center rounded-[20px] border border-amalgam-card-border bg-amalgam-canvas"
            >
              <CapabilityIcon
                name="capability"
                className="icm-header-capability-icon text-amalgam-text-muted"
              />
            </div>
          )}
          <div className="icm-side-grid-header__copy">
            <h2 id={`${grid.id}-title`} data-grid-title>
              {grid.title}
            </h2>
            {(grid.channelLabel || grid.subtitle) && (
              <p data-grid-meta className="icm-side-grid-header__meta">
                {isLeft
                  ? [grid.channelLabel, grid.subtitle].filter(Boolean).join(" ")
                  : [grid.subtitle, grid.channelLabel].filter(Boolean).join(" ")}
              </p>
            )}
          </div>
          {!isLeft && (
            <div
              data-grid-header-icon
              className="icm-side-grid-header__icon flex shrink-0 items-center justify-center rounded-[20px] border border-amalgam-card-border bg-amalgam-canvas"
            >
              <CapabilityIcon
                name="capability"
                className="icm-header-capability-icon text-amalgam-text-muted"
              />
            </div>
          )}
        </div>
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
