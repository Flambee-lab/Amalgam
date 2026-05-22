import type { OrbitalBackgroundDefinition } from "../../types/orbital";

export const DEFAULT_ORBITAL_BACKGROUND_SRC = "/images/slide.svg";

export interface OrbitalBackgroundProps {
  config: OrbitalBackgroundDefinition;
}

/**
 * Marco orbital principal — slide.svg (Figma), sin geometría legacy.
 */
export function OrbitalBackground({ config }: OrbitalBackgroundProps) {
  const src = config.assetSrc ?? DEFAULT_ORBITAL_BACKGROUND_SRC;

  return (
    <div className="icm-orbital-bg" aria-hidden>
      <img
        src={src}
        alt=""
        className="icm-orbital-bg__asset icm-orbital-bg__asset--svg"
        width={config.intrinsicWidth ?? config.width}
        height={config.intrinsicHeight ?? config.height}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
