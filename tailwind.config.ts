import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arcade: {
          bg: "var(--bg)",
          "bg-2": "var(--bg-2)",
          "bg-3": "var(--bg-3)",
          ink: "var(--ink)",
          "ink-dim": "var(--ink-dim)",
          "ink-faint": "var(--ink-faint)",
          cyan: "var(--cyan)",
          magenta: "var(--magenta)",
          yellow: "var(--yellow)",
          green: "var(--green)",
          gold: "var(--gold)",
          silver: "var(--silver)",
          bronze: "var(--bronze)",
        },
      },
      fontFamily: {
        pixel: "var(--pixel)",
        mono: "var(--mono)",
      },
      boxShadow: {
        "neon-cyan": "0 0 6px rgba(0, 245, 255, 0.65), 0 0 16px rgba(0, 245, 255, 0.45)",
        "neon-magenta": "0 0 6px rgba(255, 0, 110, 0.65), 0 0 16px rgba(255, 0, 110, 0.45)",
        "neon-yellow": "0 0 6px rgba(245, 255, 0, 0.7), 0 0 16px rgba(245, 255, 0, 0.4)",
        "neon-green": "0 0 6px rgba(0, 255, 136, 0.6), 0 0 16px rgba(0, 255, 136, 0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
