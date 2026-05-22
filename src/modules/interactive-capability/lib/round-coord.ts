/** Redondeo estable SSR/cliente para evitar hydration mismatch */
export function roundCoord(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/** Formato fijo para atributos SVG `d` */
export function formatCoord(value: number, decimals = 2): string {
  return roundCoord(value, decimals).toFixed(decimals);
}
