# ui.pen → Tailwind 換算表

出典: `design/v3/ui.pen` の変数（`GetVariables()`）、`src/styles/tokens.css`、`src/styles/globals.css` の `@theme`。

## 目次

- ⚠️ 先に読む罠: Tailwind デフォルトのカラーパレットが生きている
- フォントサイズ
- 色（実装側に存在しないトークン / 壊れている参照＝使用禁止）
- 余白
- 角丸
- 字間 / 行間
- 書体・ウェイト
- body の既定値は書かない
- 任意値を使ってよい唯一のケース

---

## ⚠️ 先に読む罠: Tailwind デフォルトのカラーパレットが生きている

`globals.css` の `@theme` は `--color-*: initial` を**していない**。
そのため `text-neutral-600` `bg-gray-100` `text-slate-900` などが**エラーにならずに通る**が、
当たる色は Tailwind 標準色でデザインの値ではない（例: `neutral-600` は `#525252`、デザインは `#636a6f`）。

**禁止クラス**:
- `*-neutral-*` `*-gray-*` `*-slate-*` `*-zinc-*` `*-stone-*` などの Tailwind 標準パレット
- 任意値の色 `text-[#181b1d]` `bg-[#f0f2f4]`

色は必ず**ロール名**（下表）で書く。

---

## フォントサイズ

pen の変数名と Tailwind のクラス名が **1:1 で同名**。そのまま写せる。

| pen 変数 | px | Tailwind |
| --- | --- | --- |
| `$text-2xs` | 10.5 | `text-2xs` |
| `$text-sm` | 11.66 | `text-sm` |
| `$text-base` | 14 | `text-base` ← body の既定 |
| `$text-md` | 16.8 | `text-md` |
| `$text-lg` | 20.16 | `text-lg` |
| `$text-xl` | 24.19 | `text-xl` |
| `$text-2xl` | 29.03 | `text-2xl` |
| `$text-3xl` | 34.84 | `text-3xl` |
| `$text-4xl` | 41.8 | `text-4xl` |

> **`text-2xs` / `text-md` は Tailwind 標準には無い名前で、`text-5xl` は逆に存在しない。**
> `@theme` が `--text-*: initial` で標準スケールを完全に潰し、pen の段名で再定義しているため。
> 標準の感覚で `text-5xl` などと書くとクラスが生成されず無効になる。

## 色

pen の変数名と Tailwind のクラス名が **1:1 で同名**。そのまま写せる。

| pen 変数 | Tailwind | 用途 |
| --- | --- | --- |
| `$surface` | `bg-surface` | ページ背景（body に既定済み。通常は不要） |
| `$surface-container-low` | `bg-surface-container-low` | チップ・淡い面 |
| `$surface-container` | `bg-surface-container` | やや強い面 |
| `$primary` | `bg-primary` / `text-primary` | 主要要素・見出し |
| `$secondary` | `text-secondary` | 副次テキスト |
| `$on-primary` | `text-on-primary` | primary 面上の文字 |
| `$on-surface` | `text-on-surface` | 本文（body に既定済み。通常は不要） |
| `$on-surface-variant` | `text-on-surface-variant` | 補助テキスト |
| `$outline` | `border-outline` | 境界線（強） |
| `$outline-variant` | `border-outline-variant` | 境界線（弱・区切り） |
| `$ac-success` | `text-ac-success` | 状態色 |
| `$ac-warning` | `text-ac-warning` | 〃 |
| `$ac-danger` | `text-ac-danger` | 〃 |
| `$ac-info` | `text-ac-info` | 〃 |

このデザインは**影ではなく境界線で階層を作る**。`shadow-*` は原則使わない（tokens.css に定義はあるが未使用）。

### 実装側に存在しないトークン（要報告）

以下は pen 側にあるが Tailwind クラスが存在しない。使う必要が出たらユーザーに報告して指示を仰ぐこと。**勝手に `@theme` に足さない。**

- `$ac-success-bg` `$ac-warning-bg` `$ac-danger-bg` `$ac-info-bg`（Callout の背景色。`Callout` 実装時に必ず当たる）

### 壊れている参照（使用禁止）

- `bg-surface-raised` — `globals.css` が `--color-surface-raised` を参照しているが `tokens.css` に定義がない。透明になる。

---

## 余白

pen の `$space-N` は **px の実値**。Tailwind は 4px 基準なので **N ÷ 4**。

| pen | Tailwind | | pen | Tailwind |
| --- | --- | --- | --- | --- |
| `$space-4` | `1` | | `$space-40` | `10` |
| `$space-8` | `2` | | `$space-48` | `12` |
| `$space-12` | `3` | | `$space-56` | `14` |
| `$space-16` | `4` | | `$space-64` | `16` |
| `$space-20` | `5` | | `$space-72` | `18` |
| `$space-24` | `6` | | `$space-80` | `20` |
| `$space-28` | `7` | | `$space-88` | `22` |
| `$space-32` | `8` | | `$space-96` | `24` |
| | | | `$space-100` | `25` |

`gap-2` `px-4` `py-6` の形で使う。

> `@theme` には `--spacing-xs`（8px）〜`--spacing-5xl` も定義されていて `gap-md` のような書き方も通るが、
> **既存実装は数値スケールで統一されている**（`ArticleRow.tsx` の `gap-8` `py-6` `gap-2`）。数値側に合わせること。

---

## 角丸

pen ノードの `cornerRadius`（px）から引く。

| px | Tailwind |
| --- | --- |
| 0 | `rounded-none` |
| 8 | `rounded-xs` |
| 12 | `rounded-sm` |
| 16 | `rounded-md` |
| 24 | `rounded-lg` |
| 9999 | `rounded-full` |

用途別のエイリアスもあり、意図が明確な場合はこちらが読みやすい:
`rounded-button`（= full）/ `rounded-card`（= 24px）/ `rounded-input`（= 12px）/ `rounded-badge`（= full）

> **`rounded-xs` は Tailwind 標準の 2px ではない。** `--radius-*: initial` で標準スケールを潰して再定義しているため 8px。
> 角丸は差ではなく比で効くので、「4px しか違わない」と言って隣接する段をまとめないこと（`tokens.css` のコメント）。

---

## 字間 / 行間

pen ノードの `letterSpacing`（px）:

| px | Tailwind |
| --- | --- |
| -0.8 | `tracking-tighter` |
| -0.5 | `tracking-tight` |
| -0.3 | `tracking-snug` |
| 0 | `tracking-normal` |
| 0.2 | `tracking-wide` ← body の既定 |
| 0.5 | `tracking-wider` |
| 1 | `tracking-widest` |

pen ノードの `lineHeight`（比率）:

| 値 | Tailwind |
| --- | --- |
| 1.3 | `leading-tight`（見出し） |
| 1.6 | `leading-normal` ← body の既定 |
| 1.75 | `leading-relaxed` |

---

## 書体・ウェイト

| pen | Tailwind |
| --- | --- |
| `$font-sans`（Noto Sans JP） | `font-sans` ← body の既定 |
| `$font-mono`（JetBrains Mono） | `font-mono` |

| pen `fontWeight` | Tailwind |
| --- | --- |
| 400 | `font-normal` ← 既定 |
| 500 | `font-medium` |
| 700 | `font-bold` |

---

## body の既定値は書かない

`globals.css` の `@layer base` が body に以下を適用済み。**既定から外れるものだけ宣言する。**

`bg-surface` / `text-on-surface` / `font-sans` / `text-base` / `leading-normal` / `tracking-wide`

---

## 任意値を使ってよい唯一のケース

トークンに段が存在しないサイズが pen に出てきた場合のみ、`text-[15.5px]` `tracking-[0.5px]` のように任意値で書く
（既存の `ArticleRow.tsx` に前例あり）。**色には決して使わない。**
頻出するようならトークンの不足なので、ユーザーに報告する。
