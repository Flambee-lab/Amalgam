export type LabelDensity = "default" | "compact" | "dense";

const NBSP = "\u00a0";

/** Clasifica labels largos para ajustar tipografía sin truncar */
export function getLabelDensity(label: string): LabelDensity {
  const length = label.length;
  const words = label.trim().split(/\s+/).length;

  if (
    length >= 40 ||
    (length >= 32 && label.includes("(")) ||
    (length >= 30 && label.includes(" & "))
  ) {
    return "dense";
  }
  if (length >= 24 || words >= 4) {
    return "compact";
  }
  return "default";
}

const KEEP_TOGETHER: ReadonlyArray<[string, string]> = [
  ["One-Click Enrollment", `One-Click${NBSP}Enrollment`],
  ["Patient Identification", `Patient${NBSP}Identification`],
  ["Medical Device", `Medical${NBSP}Device`],
  ["Cognitive Behavioral", `Cognitive${NBSP}Behavioral`],
  ["Native EHR", `Native${NBSP}EHR`],
  ["Specialty Drugs", `Specialty${NBSP}Drugs`],
  ["Drugs, DTx", `Drugs,${NBSP}DTx`],
  ["Integrations & Ecosystem", `Integrations &${NBSP}Ecosystem`],
  ["Multi-Brand Support", `Multi-Brand${NBSP}Support`],
  ["Support Services", `Support${NBSP}Services`],
  ["Reporting and", `Reporting${NBSP}and`],
];

function applyKeepTogether(text: string): string {
  let result = text;
  for (const [phrase, joined] of KEEP_TOGETHER) {
    result = result.replaceAll(phrase, joined);
  }
  return result;
}

/** Evita viudas: une las dos últimas palabras cuando la última es corta */
function preventOrphans(line: string): string {
  const parts = line.trim().split(/\s+/);
  if (parts.length < 3) return line.trim();

  const last = parts[parts.length - 1]!;
  const orphanThreshold = last.replace(/[),.;:!?]+$/, "").length;

  if (orphanThreshold <= 5) {
    const prev = parts.pop()!;
    const lastWord = parts.pop()!;
    parts.push(`${lastWord}${NBSP}${prev}`);
  }

  return parts.join(" ");
}

/** Parte listas entre paréntesis en renglones equilibrados (compact) */
function formatParentheticalLine(line: string): string {
  const match = line.trim().match(/^\((.+)\)$/);
  if (!match) return preventOrphans(line);

  const inner = match[1]!;
  if (inner.length < 20) return preventOrphans(line);

  const segments = inner.split(/,\s+/);

  if (segments.length >= 3) {
    return preventOrphans(
      `(${segments[0]},\n${segments.slice(1).join(", ")})`
    );
  }

  if (segments.length === 2 && inner.length >= 18) {
    return preventOrphans(`(${segments[0]},\n${segments[1]})`);
  }

  return preventOrphans(line);
}

function formatLines(text: string, splitParenthetical: boolean): string {
  return text
    .split("\n")
    .map((line) =>
      splitParenthetical && line.trim().startsWith("(")
        ? formatParentheticalLine(line)
        : preventOrphans(line)
    )
    .join("\n");
}

/**
 * Wrapping equilibrado sin truncar.
 * - dense: título + bloque paréntesis (máx. 2 bloques, composición vertical compacta)
 * - compact: dense + cortes internos en listas largas entre paréntesis
 */
export function formatCapabilityLabel(
  label: string,
  density: LabelDensity
): string {
  if (density === "default") return label;

  let text = applyKeepTogether(label.trim());
  text = text.replace(/\s+\(/, "\n(");
  text = text.replace(/\s+&\s+/, `\n&${NBSP}`);
  text = applyKeepTogether(text);

  return formatLines(text, density === "compact");
}
