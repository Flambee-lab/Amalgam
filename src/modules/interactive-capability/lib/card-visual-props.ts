import type { CapabilityVisualState } from "../types";
import { capabilityTokens } from "../config/tokens";

export interface CardVisualProps {
  opacity: number;
  borderColor: string;
  backgroundColor: string;
  boxShadow: string;
  textClass: string;
  isHighlighted: boolean;
}

export type CardVisualVariant = "side" | "central";

const REST_LABEL_CLASS = "text-amalgam-card-label";

/** REST (inactive/active) vs highlighted — misma tipografía celestito al 100% en reposo */
export function getCardVisualProps(
  state: CapabilityVisualState,
  accent: "purple" | "teal" = "purple",
  variant: CardVisualVariant = "side"
): CardVisualProps {
  const { colors, opacity, shadows, surfaces } = capabilityTokens;
  const restBorder =
    variant === "side" ? colors.cardBorderRest : colors.cardBorderLegacy;
  const restBg = surfaces.cardRest;

  if (state === "highlighted") {
    return {
      opacity: opacity.highlighted,
      borderColor: colors.cardBorderHighlight,
      backgroundColor: surfaces.cardHighlighted,
      boxShadow: shadows.cardHighlightWhite,
      textClass:
        variant === "side"
          ? "text-white"
          : accent === "teal"
            ? "text-amalgam-text-teal"
            : "text-white",
      isHighlighted: true,
    };
  }

  return {
    opacity: opacity.inactive,
    borderColor: restBorder,
    backgroundColor: restBg,
    boxShadow: "none",
    textClass:
      variant === "side" ? REST_LABEL_CLASS : "text-amalgam-text-teal",
    isHighlighted: false,
  };
}

/** Cards flotantes del hub — glow teal fijo, sin highlight blanco ni tabs */
export function getOrbitalCardVisualProps(): CardVisualProps {
  const { colors, surfaces, shadows, opacity } = capabilityTokens;
  return {
    opacity: opacity.active,
    borderColor: colors.teal,
    backgroundColor: surfaces.cardRest,
    boxShadow: shadows.orbitalCardTeal,
    textClass: "text-amalgam-text-teal",
    isHighlighted: false,
  };
}
