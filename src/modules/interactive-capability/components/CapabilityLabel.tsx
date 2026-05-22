import { Fragment } from "react";
import {
  formatCapabilityLabel,
  getLabelDensity,
  type LabelDensity,
} from "../lib/capability-label-density";

export interface CapabilityLabelProps {
  label: string;
  className?: string;
}

/** Label con wrapping controlado (sin truncar) y tipografía por densidad */
export function CapabilityLabel({ label, className }: CapabilityLabelProps) {
  const density: LabelDensity = getLabelDensity(label);
  const formatted = formatCapabilityLabel(label, density);
  const lines = formatted.split("\n");

  return (
    <p
      className={[
        "icm-capability-card__label",
        `icm-capability-card__label--${density}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {lines.map((line, index) => (
        <Fragment key={`${index}-${line}`}>
          {index > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </p>
  );
}

export { getLabelDensity };
