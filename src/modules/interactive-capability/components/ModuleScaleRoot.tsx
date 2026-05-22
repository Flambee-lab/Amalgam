"use client";

import type { ReactNode } from "react";

export interface ModuleScaleRootProps {
  children: ReactNode;
  className?: string;
}

/** Contenedor del módulo — la escala fluida vive en CSS (`--icm-fluid`, clamp, cqi). */
export function ModuleScaleRoot({ children, className }: ModuleScaleRootProps) {
  return (
    <div
      className={["w-full max-w-[100vw] overflow-x-clip overflow-y-visible", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
