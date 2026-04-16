import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand ──────────────────────────────
        kreiq:        "#0040FF",
        "kreiq-dim":  "rgba(0,64,255,0.08)",
        "kreiq-border": "rgba(0,64,255,0.20)",

        // ── Light surfaces ─────────────────────
        ink:          "#0F0F11",
        "ink-secondary": "#4B4D58",
        "ink-muted":  "#8C8FA3",

        surface:      "#F7F8FA",
        "surface-border": "#E8EAED",

        // ── Aliases for light mode ─────────────
        "gray-700":   "#4B4D58",
        "gray-500":   "#8C8FA3",
        "gray-400":   "#AAADB8",
        "gray-300":   "#C8CBD6",
        "gray-100":   "#E8EAED",
        "gray-50":    "#F7F8FA",

        // ── Legacy accent aliases → kreiq blue ─
        violet:  "#0040FF",
        indigo:  "#0040FF",
        cyan:    "#0040FF",

        // ── Status colours ─────────────────────
        rose:    "#F43F5E",
        emerald: "#10B981",
        amber:   "#F59E0B",
      },
      fontFamily: {
        jakarta:  ["var(--font-jakarta)", "system-ui", "sans-serif"],
        garamond: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        inter:    ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono:     ["var(--font-jetbrains)", "monospace"],
        // Aliases for backward compatibility
        syne:     ["var(--font-jakarta)", "system-ui", "sans-serif"],
        geist:    ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      backgroundImage: {
        "kreiq-radial":
          "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,64,255,0.08), transparent)",
      },
      boxShadow: {
        "kreiq-glow":   "0 0 40px rgba(0,64,255,0.12)",
        "kreiq-glow-lg":"0 0 80px rgba(0,64,255,0.08)",
        "card-hover":   "0 8px 32px rgba(0,64,255,0.08), 0 2px 8px rgba(0,0,0,0.04)",
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "28px",
        "4xl": "32px",
      },
    },
  },
  plugins: [],
};
export default config;
