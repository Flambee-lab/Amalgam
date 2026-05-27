export interface TabSectionLabelProps {
  children: string;
  className?: string;
  /** Coloca esta palabra en la 2.ª columna del grid (p. ej. «for» sobre Patients) */
  anchorWord?: string;
}

function splitAnchorWord(text: string, anchorWord: string) {
  const index = text.lastIndexOf(anchorWord);
  if (index < 0) {
    return { lead: text, anchor: null as string | null };
  }
  return {
    lead: text.slice(0, index),
    anchor: text.slice(index),
  };
}

/** Encabezado del tab bar — gradiente rosa suave, jerarquía sobre títulos de grid */
export function TabSectionLabel({
  children,
  className,
  anchorWord,
}: TabSectionLabelProps) {
  const { lead, anchor } = anchorWord
    ? splitAnchorWord(children, anchorWord)
    : { lead: children, anchor: null };

  return (
    <p
      data-tab-section-label
      data-tab-section-label-anchored={anchor ? "" : undefined}
      className={["icm-tab-section-label font-sans font-medium", className]
        .filter(Boolean)
        .join(" ")}
    >
      {anchor ? (
        <>
          <span className="icm-tab-section-label__lead">{lead}</span>
          <span className="icm-tab-section-label__anchor">{anchor}</span>
        </>
      ) : (
        children
      )}
    </p>
  );
}
