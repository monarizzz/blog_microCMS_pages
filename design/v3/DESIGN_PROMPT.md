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
```

### Line heights
```css
--line-height-tight: 1.3;
--line-height-normal: 1.6;
--line-height-relaxed: 1.75;
```

### Font families
```css
--font-family-heading: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', system-ui, sans-serif;
--font-family-body: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', system-ui, sans-serif;
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
- Base radius: 24px (capsule)
- Scale approach: scaled
- Rationale: bold, almost-pill — per-component variation that reinforces shape roles (inputs crisper, cards softer).

### Radius scale
```css
--radius-none: 0;
--radius-sm: 0.75rem;
--radius-md: 1.5rem;
--radius-lg: 2.25rem;
--radius-xl: 3rem;
--radius-full: 9999px;
```

### Per-component variables
```css
--radius-input: 0.75rem;
--radius-button: 1.5rem;
--radius-card: 2.25rem;
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

### Primary palette
```css
--color-primary-50: oklch(98.5% 0.0018 240);
--color-primary-100: oklch(96% 0.0036 240);
--color-primary-200: oklch(90% 0.0066 240);
--color-primary-300: oklch(82% 0.0096 240);
--color-primary-400: oklch(72% 0.0114 240);
--color-primary-500: oklch(62% 0.012 240);
--color-primary-600: oklch(52% 0.0114 240);
--color-primary-700: oklch(42% 0.0096 240);
--color-primary-800: oklch(32% 0.0078 240);
--color-primary-900: oklch(22% 0.0054 240);
--color-primary-950: oklch(15% 0.0042 240);
```

### Neutral palette
```css
--color-neutral-50: oklch(98.5% 0.0018 240);
--color-neutral-100: oklch(96% 0.0036 240);
--color-neutral-200: oklch(90% 0.0066 240);
--color-neutral-300: oklch(82% 0.0096 240);
--color-neutral-400: oklch(72% 0.0114 240);
--color-neutral-500: oklch(62% 0.012 240);
--color-neutral-600: oklch(52% 0.0114 240);
--color-neutral-700: oklch(42% 0.0096 240);
--color-neutral-800: oklch(32% 0.0078 240);
--color-neutral-900: oklch(22% 0.0054 240);
--color-neutral-950: oklch(15% 0.0042 240);
```

### Semantic surface roles
```css
--color-bg: var(--color-neutral-50);
--color-surface: var(--color-neutral-50);
--color-surface-raised: oklch(100% 0 0);
--color-text: var(--color-neutral-900);
--color-text-muted: var(--color-neutral-600);
--color-border: var(--color-neutral-200);
--color-border-strong: var(--color-neutral-300);
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
- `focus`: `2px solid var(--color-primary-500)` with offset `2px`
- `disabled`: opacity 40%

### Dark variants
```css
--color-primary-dark-50: oklch(15% 0.0042 240);
--color-primary-dark-100: oklch(22% 0.0054 240);
--color-primary-dark-200: oklch(32% 0.0078 240);
--color-primary-dark-300: oklch(42% 0.0096 240);
--color-primary-dark-400: oklch(52% 0.0114 240);
--color-primary-dark-500: oklch(62% 0.012 240);
--color-primary-dark-600: oklch(72% 0.0114 240);
--color-primary-dark-700: oklch(82% 0.0096 240);
--color-primary-dark-800: oklch(90% 0.0066 240);
--color-primary-dark-900: oklch(96% 0.0036 240);
--color-primary-dark-950: oklch(98.5% 0.0018 240);
```

```css
--color-neutral-dark-50: oklch(15% 0.0042 240);
--color-neutral-dark-100: oklch(22% 0.0054 240);
--color-neutral-dark-200: oklch(32% 0.0078 240);
--color-neutral-dark-300: oklch(42% 0.0096 240);
--color-neutral-dark-400: oklch(52% 0.0114 240);
--color-neutral-dark-500: oklch(62% 0.012 240);
--color-neutral-dark-600: oklch(72% 0.0114 240);
--color-neutral-dark-700: oklch(82% 0.0096 240);
--color-neutral-dark-800: oklch(90% 0.0066 240);
--color-neutral-dark-900: oklch(96% 0.0036 240);
--color-neutral-dark-950: oklch(98.5% 0.0018 240);
```

## Usage guidelines

- Primary actions: `var(--color-primary-500)`; on hover `var(--color-primary-600)`; on active `var(--color-primary-700)`
- Page background: `var(--color-bg)`; elevated panels use `var(--color-surface-raised)`; body copy uses `var(--color-text)`
- Cards: `var(--radius-card)` with `var(--shadow-md)`
- Buttons: `var(--radius-button)` with `var(--shadow-sm)` on the primary variant
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