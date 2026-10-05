import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5F5F7",
        header: "#FFFFFF",
        ink: {
          DEFAULT: "#1A1A1A",
          soft: "#525252",
          faint: "#737373",
        },
        brand: {
          DEFAULT: "#262626",
          dark: "#141414",
          light: "#6B6B6B",
        },
        signal: {
          DEFAULT: "#8A8A8A",
          bright: "#D4D4D4",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F0F0F0",
        },
        footer: {
          DEFAULT: "#121212",
          light: "#F4F4F9",
          accent: "#01A1C9",
          "accent-dark": "#06121E",
          line: "#CCCCCC",
          muted: "#676767",
        },
      },
      fontFamily: {
        display: ["var(--font-body)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      // Tailwind's default scale, each size +1px (0.0625rem). Line heights unchanged.
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1rem" }],
        sm: ["0.9375rem", { lineHeight: "1.25rem" }],
        base: ["1.0625rem", { lineHeight: "1.5rem" }],
        lg: ["1.1875rem", { lineHeight: "1.75rem" }],
        xl: ["1.3125rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5625rem", { lineHeight: "2rem" }],
        "3xl": ["1.9375rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.3125rem", { lineHeight: "2.5rem" }],
        "5xl": ["3.0625rem", { lineHeight: "1" }],
        "6xl": ["3.8125rem", { lineHeight: "1" }],
        "7xl": ["4.5625rem", { lineHeight: "1" }],
        "8xl": ["6.0625rem", { lineHeight: "1" }],
        "9xl": ["8.0625rem", { lineHeight: "1" }],
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(26,26,26,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,26,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "64px 64px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20,20,20,0.04), 0 8px 24px -12px rgba(20,20,20,0.12)",
        lift: "0 2px 4px rgba(20,20,20,0.05), 0 24px 48px -20px rgba(20,20,20,0.22)",
        frame: "0 24px 64px -32px rgba(20,20,20,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.06)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "ken-burns": "ken-burns 9s ease-out both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
