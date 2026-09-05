# Design System Source of Truth Prompt

## Task

Create or update `/DESIGN.md` for this frontend project.

The final `DESIGN.md` must be a durable design source of truth for future AI and human contributors. It should not include this task wrapper, `<design_decisions>` tags, or notes about generating the file.

## Output contract

- Start the file with `# Design System Source of Truth`.
- Preserve every listed token value exactly.
- Do not convert color spaces, units, or shadow values unless the user explicitly asks for a target format that requires conversion.
- Keep rationale lines near the values they explain.
- Do not invent new base decisions. If the design is incomplete, omit undecided sections and mark them clearly.
- Include the `Generation instructions for AI` section so future agents know how to use the file.

<design_decisions>

## Intent
- Overall feeling: monochrome (cool tint), compact
- Target context: general (customize in the generated DESIGN.md)
- Decisions made: typography, spacing, radius, shadow, color

## Decision dependencies

- Shadow tint depends on Color: the tint resolves from the decided primary hue.

## Typography
- Base font size: 14px
- Modular scale ratio: 1.2 (minor third)
- Font pairing: Noto Sans JP — Google Noto Sans JP — universal Japanese sans, clean and clear.
- Pairing structure: single-family system (Noto Sans JP) — heading and body share the typeface for unity
- Rationale: compact, dense, utilitarian — good for dashboards and tooling

### Type scale
```css
--font-size-xs: 0.6076rem;
--font-size-sm: 0.7292rem;
--font-size-base: 0.875rem;
--font-size-lg: 1.05rem;
--font-size-xl: 1.26rem;
--font-size-2xl: 1.512rem;
--font-size-3xl: 1.8144rem;
--font-size-4xl: 2.1773rem;
--font-size-5xl: 2.6128rem;
```

### Letter spacing

Optical sizing: larger type tightens, smaller type opens up.

```css
--letter-spacing-tighter: -0.8px;
--letter-spacing-tight: -0.5px;
--letter-spacing-snug: -0.3px;
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.2px;
--letter-spacing-wider: 0.5px;
--letter-spacing-widest: 1px;
```

### Line heights
```css
--line-height-tight: 1.3;
--line-height-normal: 1.6;
--line-height-relaxed: 1.75;
```

### Font families

Heading and body share one typeface, so there is no separate `heading` / `body` variable — a single `sans` token covers both. Matches `font-sans` / `font-mono` in ui.pen.

```css
--font-family-sans: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', system-ui, sans-serif;
--font-family-mono: 'JetBrains Mono', ui-monospace, monospace;
```

### Font weights
```css
--font-weight-body: 400;
--font-weight-body-strong: 500;
--font-weight-heading: 700;
```

## Spacing
- Base unit: 8px
- Scale approach: multiplicative
- Rationale: Generous and bold — marketing-friendly breathing room.

### Spacing scale
```css
--space-2xs: 0.25rem;
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 1.5rem;
--space-lg: 2rem;
--space-xl: 3rem;
--space-2xl: 4rem;
--space-3xl: 6rem;
--space-4xl: 8rem;
--space-5xl: 12rem;
```

### Component defaults
```css
--space-button-padding-x: 1.5rem;
--space-button-padding-y: 0.5rem;
--space-card-padding: 2rem;
--space-input-padding-x: 1rem;
--space-input-padding-y: 0.5rem;
--space-section-gap: 6rem;
--space-stack-gap: 1.5rem;
```

## Radius
- Steps derived from actual usage in `ui.pen`, not from a ratio
- Rationale: buttons/tags are fully pilled while inputs and content blocks stay crisp, so the gap between "small radius" and "pill" is wide. Intermediate steps are defined instead of rounding toward one base. Radius reads as a ratio (8px → 12px is 1.5×), so adjacent steps are not collapsed just because they differ by 4px.

### Radius scale
```css
--radius-none: 0;
--radius-xs: 0.5rem; /*  8px — content blocks: code, tables, TOC */
--radius-sm: 0.75rem; /* 12px — inputs, checkboxes, chips */
--radius-md: 1rem; /* 16px — toggles, callouts */
--radius-lg: 1.5rem; /* 24px — cards */
--radius-full: 9999px; /*      — buttons, tags, pagination */
```

### Per-component variables
```css
--radius-input: 0.75rem;
--radius-button: 9999px;
--radius-card: 1.5rem;
--radius-badge: 9999px;
```

## Shadow / Elevation
- Intensity: subtle
- Tinted: yes — tint color `oklch(25% 0.08 220)`
- Rationale: quiet hierarchy without depth theater, with shadows tinted by the primary hue for cohesion.

### Shadow scale
```css
--shadow-sm: 0 1px 2px 0 oklch(25% 0.08 220 / 0.06);
--shadow-md: 0 4px 6px -1px oklch(25% 0.08 220 / 0.08), 0 2px 4px -2px oklch(25% 0.08 220 / 0.08);
--shadow-lg: 0 10px 15px -3px oklch(25% 0.08 220 / 0.1), 0 4px 6px -4px oklch(25% 0.08 220 / 0.1);
--shadow-xl: 0 20px 25px -5px oklch(25% 0.08 220 / 0.12), 0 8px 10px -6px oklch(25% 0.08 220 / 0.12);
```

### Elevation hierarchy
`dropdown` (sm) < `card` (md) < `modal` (lg) < `toast` (xl)

## Color
- Approach: monochrome (cool tint)
- Warmth: -1.00 (negative = cool, positive = warm)
- Dark mode: supported
- Rationale: Monochrome with a barely-perceptible cool (toward blue-gray, ~240°) tint (warmth -1.00). Easier on the eyes than absolute mono while keeping the no-color identity. Dark mode is supported.

### Neutral palette

Monochrome, so a separate primary ramp would be identical at every step. Only `neutral` is defined; `primary` exists as a role. Hex is authoritative (ui.pen holds the same values); OKLCH is the derivation.

```css
--color-neutral-50: #f9fafb; /* oklch(98.5% 0.0018 240) */
--color-neutral-100: #f0f2f4; /* oklch(96%   0.0036 240) */
--color-neutral-200: #dadfe2; /* oklch(90%   0.0066 240) */
--color-neutral-300: #bfc5ca; /* oklch(82%   0.0096 240) */
--color-neutral-400: #9ea6ab; /* oklch(72%   0.0114 240) */
--color-neutral-500: #80878d; /* oklch(62%   0.012  240) */
--color-neutral-600: #636a6f; /* oklch(52%   0.0114 240) */
--color-neutral-700: #494e52; /* oklch(42%   0.0096 240) */
--color-neutral-800: #2f3336; /* oklch(32%   0.0078 240) */
--color-neutral-900: #181b1d; /* oklch(22%   0.0054 240) */
--color-neutral-950: #0a0b0d; /* oklch(15%   0.0042 240) */
```

### Semantic roles

1:1 with the variables in `ui.pen`. Implementation references these, not the numbered scale.

```css
--color-surface: var(--color-neutral-50); /* page background */
--color-surface-container-low: var(--color-neutral-100);
--color-surface-container: var(--color-neutral-200);
--color-primary: var(--color-neutral-900);
--color-secondary: var(--color-neutral-700);
--color-on-primary: var(--color-neutral-50);
--color-on-surface: var(--color-neutral-900);
--color-on-surface-variant: var(--color-neutral-600);
--color-outline: var(--color-neutral-300);
--color-outline-variant: var(--color-neutral-200);
--color-ac-success: var(--color-success-500);
--color-ac-warning: var(--color-warning-500);
--color-ac-danger: var(--color-danger-500);
--color-ac-info: var(--color-info-500);
```

### Semantic colors
```css
--color-success-500: oklch(60% 0.057 145);
--color-warning-500: oklch(72% 0.057 80);
--color-danger-500:  oklch(60% 0.057 25);
--color-info-500:    oklch(60% 0.057 240);
```

### Interaction states (derived)
- `hover`: lightness -5%
- `active`: lightness -10%
- `focus`: `2px solid var(--color-primary)` with offset `2px`
- `disabled`: opacity 40%

### Dark variants

Same ramp inverted (`dark-50` is the darkest). Not implemented yet — kept for a future dark mode, which should swap the role targets rather than rewrite call sites.

```css
--color-neutral-dark-50: #0a0b0d;
--color-neutral-dark-100: #181b1d;
--color-neutral-dark-200: #2f3336;
--color-neutral-dark-300: #494e52;
--color-neutral-dark-400: #636a6f;
--color-neutral-dark-500: #80878d;
--color-neutral-dark-600: #9ea6ab;
--color-neutral-dark-700: #bfc5ca;
--color-neutral-dark-800: #dadfe2;
--color-neutral-dark-900: #f0f2f4;
--color-neutral-dark-950: #f9fafb;
```

## Usage guidelines

- Reach for a role first; drop to a numbered step only when no role fits
- Primary actions: `var(--color-primary)`; on hover `var(--color-neutral-800)`; on active `var(--color-neutral-700)`
- Page background: `var(--color-surface)`; body copy uses `var(--color-on-surface)`
- Cards: `var(--radius-card)` with a `var(--color-outline-variant)` border — the design uses no shadows
- Buttons: `var(--radius-button)`; separation comes from fill contrast, not elevation
- Inputs: `var(--radius-input)`; focus ring uses the interaction-states spec
- Body text: `var(--font-size-base)` with `var(--line-height-normal)`
- Section spacing: `var(--space-3xl)` between major blocks
- Stack spacing within a block: `var(--space-md)`

## Mode scope

- Mode: light and dark tokens are included. Use the dark variants when implementing dark mode.

## What this design system is NOT

- Not a component library specification — tokens only
- Not opinionated about responsive breakpoints
- Extend these tokens via prefixed custom properties (`--color-brand-*`), do not replace

## Change management

- Treat this file as v1 of the project's design source of truth.
- Add new tokens only when the nearest existing token cannot represent the need.
- Deprecate tokens by keeping the old token, documenting the replacement, migrating consumers, then removing it in a later change.
- Record new base decisions in an appended "Decision log" section with context.

## Generation instructions for AI

When using this DESIGN.md:
1. Treat the listed values as authoritative; do not re-derive from preference.
2. When a component needs a value not listed here, pick the nearest available token.
3. If a new decision is required, document it in an appended section and flag it clearly.
4. Preserve the rationale comments — they encode design intent and should guide new decisions in unlisted contexts.
5. Interaction states are derived rules, not hard-coded values — apply them procedurally.
6. Use the semantic surface roles for layout-level color choices before reaching directly into numbered neutral tokens.

</design_decisions>

## Execution instructions

Generate `/DESIGN.md` from the content inside `<design_decisions>`.
Do not copy the wrapper tags, this Task section, this Output contract, or these Execution instructions into the final file.