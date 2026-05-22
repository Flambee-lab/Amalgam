export interface CapabilityIconProps {
  name: string;
  className?: string;
  "data-card-icon"?: boolean;
}

/** Placeholder icon slot — swap con SVG exportados de Figma */
export function CapabilityIcon({
  name,
  className,
  "data-card-icon": dataCardIcon,
}: CapabilityIconProps) {
  switch (name) {
    case "ai-core":
      return (
        <svg
          viewBox="0 0 80 80"
          className={className}
          aria-hidden
          data-card-icon={dataCardIcon || undefined}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="aiOrb">
              <stop offset="0%" stopColor="#d912f7" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#3801b7" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#040217" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="40" cy="40" r="28" fill="url(#aiOrb)" />
        </svg>
      );
    case "enterprise":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden
          fill="none"
          data-card-icon={dataCardIcon || undefined}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3l8 4v6c0 5-3.5 8.5-8 10C7.5 21.5 4 18 4 13V7l8-4z"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      );
    case "regulatory":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden
          data-card-icon={dataCardIcon || undefined}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="3" y="3" width="8" height="8" rx="1" fill="currentColor" opacity="0.9" />
          <rect x="13" y="3" width="8" height="8" rx="1" fill="currentColor" opacity="0.6" />
          <rect x="3" y="13" width="8" height="8" rx="1" fill="currentColor" opacity="0.6" />
          <rect x="13" y="13" width="8" height="8" rx="1" fill="currentColor" opacity="0.9" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          aria-hidden
          fill="none"
          data-card-icon={dataCardIcon || undefined}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 12h8M12 8v8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
