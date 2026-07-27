import type { Config } from "tailwindcss";

/* 値は持たず、src/styles/tokens.css の変数への参照だけを持つ。
   ここに生の hex や rem を書かないこと。値の正は常に tokens.css 側にある。

   色は段階名（neutral-900 など）ではなくロール名だけを載せている。
   段階名を直接使える状態にすると、ダークモード対応時に
   参照先の差し替えでは済まなくなるため（DESIGN.md「Roles」参照） */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    /* ここから下は既定を置き換える。
       デザインに存在しない段（text-6xl など）を使えなくするため */
    fontFamily: {
      sans: "var(--font-family-sans)",
      mono: "var(--font-family-mono)",
    },
    fontSize: {
      xs: "var(--font-size-xs)",
      sm: "var(--font-size-sm)",
      base: "var(--font-size-base)",
      lg: "var(--font-size-lg)",
      xl: "var(--font-size-xl)",
      "2xl": "var(--font-size-2xl)",
      "3xl": "var(--font-size-3xl)",
      "4xl": "var(--font-size-4xl)",
      "5xl": "var(--font-size-5xl)",
    },
    lineHeight: {
      tight: "var(--line-height-tight)",
      normal: "var(--line-height-normal)",
      relaxed: "var(--line-height-relaxed)",
    },
    letterSpacing: {
      tighter: "var(--letter-spacing-tighter)",
      tight: "var(--letter-spacing-tight)",
      snug: "var(--letter-spacing-snug)",
      normal: "var(--letter-spacing-normal)",
      wide: "var(--letter-spacing-wide)",
      wider: "var(--letter-spacing-wider)",
      widest: "var(--letter-spacing-widest)",
    },
    borderRadius: {
      none: "var(--radius-none)",
      xs: "var(--radius-xs)",
      sm: "var(--radius-sm)",
      md: "var(--radius-md)",
      lg: "var(--radius-lg)",
      full: "var(--radius-full)",
      /* コンポーネント別。上の段から解決済みなので、
         カードなら rounded-card と書けば意図がそのまま読める */
      button: "var(--radius-button)",
      card: "var(--radius-card)",
      input: "var(--radius-input)",
      badge: "var(--radius-badge)",
    },
    extend: {
      colors: {
        /* 面 */
        surface: {
          DEFAULT: "var(--color-surface)",
          raised: "var(--color-surface-raised)",
          "container-low": "var(--color-surface-container-low)",
          container: "var(--color-surface-container)",
        },
        /* 文字・主要要素 */
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        "on-primary": "var(--color-on-primary)",
        "on-surface": {
          DEFAULT: "var(--color-on-surface)",
          variant: "var(--color-on-surface-variant)",
        },
        /* 境界線。このデザインは影ではなく境界線で階層を作る */
        outline: {
          DEFAULT: "var(--color-outline)",
          variant: "var(--color-outline-variant)",
        },
        /* アクセント */
        ac: {
          success: "var(--color-ac-success)",
          warning: "var(--color-ac-warning)",
          danger: "var(--color-ac-danger)",
          info: "var(--color-ac-info)",
        },
      },
      /* 名前付きの段を足すだけで、既定の数値スケール（p-4 など）は残す。
         置き換えてしまうと gap-px や w-4 まで巻き添えで消えるため */
      spacing: {
        "2xs": "var(--space-2xs)",
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
        "3xl": "var(--space-3xl)",
        "4xl": "var(--space-4xl)",
        "5xl": "var(--space-5xl)",
      },
      /* --shadow-* は意図的に載せていない。
         階層は影ではなく outline の境界線で表現する方針のため（tokens.css 参照） */
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
