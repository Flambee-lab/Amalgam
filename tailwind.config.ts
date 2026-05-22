import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        amalgam: {
          canvas: "#040217",
          purple: "#d912f7",
          teal: "#25c1b5",
          "card-border": "#14163C",
          "card-label": "#c3cbff",
          "card-border-legacy": "#2d3374",
          "text-muted": "#c3cbff",
          "text-teal": "#a8e6e1",
          "text-teal-bright": "#74d7cf",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-open-sans)", "Open Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-purple-sm": "0 0 20px rgba(217, 18, 247, 0.4)",
        "glow-purple-md": "0 0 28px rgba(217, 18, 247, 0.55)",
        "glow-purple-lg": "0 0 40px rgba(217, 18, 247, 0.65), 0 0 80px rgba(217, 18, 247, 0.25)",
        "glow-teal-sm": "0 0 20px rgba(37, 193, 181, 0.4)",
        "glow-teal-md": "0 0 28px rgba(37, 193, 181, 0.55)",
        "glow-teal-lg": "0 0 40px rgba(37, 193, 181, 0.65), 0 0 80px rgba(37, 193, 181, 0.3)",
      },
      borderRadius: {
        card: "1.25rem",
        tab: "1.33rem",
      },
      spacing: {
        "card-gap": "0.67rem",
        "grid-gap": "0.67rem",
      },
      transitionDuration: {
        premium: "420ms",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
