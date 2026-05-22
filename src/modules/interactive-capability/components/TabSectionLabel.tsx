export interface TabSectionLabelProps {
  children: string;
  className?: string;
}

/** Encabezado del tab bar — gradiente rosa suave, jerarquía sobre títulos de grid */
export function TabSectionLabel({ children, className }: TabSectionLabelProps) {
  return (
    <p
      data-tab-section-label
      className={["icm-tab-section-label font-sans font-medium", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}
