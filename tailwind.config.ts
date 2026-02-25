import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontSize: {
        "2xs": "0.6875rem",
        "3xs": "0.625rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
