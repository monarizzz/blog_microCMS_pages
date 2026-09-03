# ui.pen ↔ 実装 対応表

`design/v3/ui.pen` の reusable コンポーネント（全 53 個）と実装ファイルの対応。

- ✅ 実装済み / 🟡 部分実装・要確認 / ❌ 未実装
- **ID** は `mcp__pencil__execute` の `Get("<ID>", {depth: 4})` にそのまま渡せる
- **名前は pen と実装で一致していない。**必ずこの表を引くこと

> この表は手で維持する。コンポーネントを実装したら**この表も更新する**こと。
> ID は pen 側でコンポーネントを作り直すと変わる。見つからなければ
> `Get(n => n.reusable && Print(n.id, n.name))` で取り直す。

## 目次

- ページ
- レイアウト・ナビゲーション
- 記事一覧・記事メタ
- テキスト・ラベル
- 記事本文（リッチエディタ由来の要素）
- ボタン・フォーム
- サービス・プロフィール
- Shelf（本棚）
- メディア・スケルトン
- 実装の推奨順

---

## ページ

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `ArticleListPage` | `nwTBC` | `src/features/article/components/articlePage/articlePage.tsx` | ✅ ルートは `src/app/article/page.tsx` |
| `SearchPage` | `gwtSi` | `src/features/search/components/SearchPageMain/SearchPageMain.tsx` | ✅ |
| `ServiceDetailPage` | `qiFnK` | — | ❌ |

参考: ページ全体のデザインは reusable ではなくトップレベルの group にもある
（`Home Page` `Article Page` `Article Detail` `Tags` `Profile` `Service` `Search` `404 Page`）。
ページを組む時はそちらを `Get` して構成を確認する。

## レイアウト・ナビゲーション

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `Header` | `K2xrvp` | `src/features/layout/components/Header/Header.tsx` | ✅ |
| `Footer` | `VMThv` | `src/features/layout/components/Footer/Footer.tsx` | ✅ |
| `GlobalNav` | `JuCgU` | `src/features/layout/components/GlobalNav/GlobalNav.tsx` | ✅ |
| `Logo` | `VD5vy` | — | ❌ |
| `PageHeader` | `XEUvq` | `src/commons/layout/components/PageHeader/PageHeader.tsx` | 🟡 標準形と `compact` のみ |
| `ScrollNav` | `qXMlW` | — | ❌ |
| `ScrollTopButton` | `YJxBa` | — | ❌ |

- `src/features/layout/components/LayoutMain/LayoutMain.tsx` は pen に対応物なし（実装都合の骨組み）
- `PageHeader` の未対応バリアント（pen 側インスタンスの上書き）:
  - `Hero`（`sHYtM`）— gap 14
  - `PageHead`（`TzqGY`）— gap `$space-8` / Sub の `lineHeight` 1.6
  - `PageHead`（`nrspz`）— Sub が `$text-base` / 幅 560
  - `Intro`（`UmjU2`）— gap 18 / padding 付き / Kicker が `$font-mono` `letterSpacing` 2 /
    Title は `letterSpacing` -0.3（`tracking-snug`）
  - 実装済みは標準形（gap-4・`text-4xl`・`tracking-tighter`）と
    `compact`（`MyXLm` 相当: gap-3・`text-3xl`・`tracking-tight`）の2種類のみ

## 記事一覧・記事メタ

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `ArticleRow` | `D7Q2z7` | `src/commons/article/components/ArticleRow/ArticleRow.tsx` | ✅ |
| `ArticleRowCompact` | `JE7aw` | 同上（`compact` prop で兼用） | ✅ |
| `Tag` | `biM87` | `src/commons/layout/components/TagBtn/TagBtn.tsx` | ✅ |
| `SeeAllLink` | `ZRLCv` | `src/commons/layout/components/SeeAllRight/SeeAllRight.tsx` | ✅ |
| `Pagination` | `uxLwl` | `src/commons/pageNav/components/pageNavNum/pageNavNum.tsx` | ✅ |
| `ArticleThumbnail` | `N7jyll` | — | ❌ |
| `CategorySectionHeader` | `QSeNC` | — | ❌ |
| `ArticleSectionHeading` | `RgUbK` | — | ❌ |

- `src/commons/layout/components/FilterBtn/FilterBtn.tsx` は `Tag` の `#` なし版。
  pen 側に独立コンポーネントはなく、`Tags` ページ（group `j9tOQT`）のフィルタ行が出典。
  `Tag` を触る時は `CHIP_CLASS_NAME`（`src/commons/layout/constants/chipStyle.ts`）を共有しているので巻き添えに注意。
  `ArticleListPage` のソート行（`SortRow` `vV5Py`）は未実装。選択/非選択の色は `FilterBtn` と
  同じで padding だけ 6/12（`Tag` の override）なので、実装時に `FilterBtn` を再利用するか
  別コンポーネントにするかを決めること。

## テキスト・ラベル

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `SectionLabel` | `TbTSl` | — | ❌ |
| `InfoLabel` | `PHZV0` | — | ❌ |
| `MetaText` | `E2rKp` | `src/commons/layout/components/MetaText/MetaText.tsx` | ✅ |
| `Paragraph` | `g5WYtH` | — | ❌ |

## 記事本文（リッチエディタ由来の要素）

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `ArticleH1` | `Y5MxdQ` | — | ❌ |
| `ArticleH2` | `sSgdW` | — | ❌ |
| `ArticleH3` | `v0Atx` | — | ❌ |
| `Callout` | `KaNJF` | — | ❌ ※ `$ac-*-bg` が実装側に無い。token-map.md 参照 |
| `Quote` | `xR0ql` | — | ❌ |
| `BulletItem` | `eQqNb` | — | ❌ |
| `NumberItem` | `c3XVs` | — | ❌ |
| `Checkbox` | `D1pbg` | — | ❌ |
| `Toggle` | `HbAE1` | — | ❌ |
| `Divider` | `Ar2tj` | — | ❌ |
| `CodeBlock` | `qvMsD` | — | ❌ |
| `Table` | `Y1rfsy` | — | ❌ |
| `Bookmark` | `A4rGR` | — | ❌ |

これらは microCMS のリッチエディタ HTML を変換して当てる想定
（`microcms-rich-editor-handler` / `cheerio` が依存に入っている）。
**ただしデータ接続は別フェーズ**。このスキルでは見た目のコンポーネントまで作る。

## ボタン・フォーム

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `SearchInput` | `Jh09L` | `src/features/search/components/SearchInput/SearchInput.tsx` | ✅ |
| `IconButton` | `aGtFB` | `src/commons/layout/components/IconBtn/IconBtn.tsx` | ✅ |
| `SearchIconButton` | `k2xlJ` | — | ❌ |
| `LinkButton` | `Rl2z4` | — | ❌ |
| `BackLink` | `r2KGU` | `src/commons/layout/components/BackLink/BackLink.tsx` | ✅ |
| `PrimaryButton` | `N3GA43` | — | ❌ |

## サービス・プロフィール

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `ServiceCard` | `jhtzh` | — | ❌ |
| `ServiceCardRow` | `T2ai0` | — | ❌ |
| `ProjectItem` | `XiMk9` | — | ❌ |
| `InfoRow` | `Nle6p` | — | ❌ |
| `ShareBar` | `VyBtl` | — | ❌ |

## Shelf（本棚）

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `ShelfBook` | `AXiNC` | — | ❌ |
| `ShelfNote` | `mqZTV` | — | ❌ |
| `ShelfLabel` | `C0GFq` | — | ❌ |
| `ShelfPlank` | `T42nPd` | — | ❌ |

Shelf は横スクロールする仕様。`Home Page — Shelf (案)`（frame `hdLAj`）が配置の参考。

## メディア・スケルトン

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `ImagePlaceholder` | `XHkBO` | — | ❌ |
| `ArticleRowSkeleton` | `M4eia` | — | ❌ |
| `ArticleCardSkeleton` | `Pacnv` | — | ❌ |

スケルトンの並べ方は `Skeleton Demo (Loading)`（frame `ogaR6`）に
`ListLoading` / `GridLoading` として置かれている。
アニメーションは `tailwindcss-animate` が入っているので `animate-pulse` 相当を使う。

---

## 実装の推奨順

依存の少ないものから。上ほど先。

1. **葉のパーツ** — `SectionLabel` `MetaText` `InfoLabel` `Divider` `ImagePlaceholder`
2. **ボタン類** — `PrimaryButton` `LinkButton` `BackLink` `SearchIconButton`
3. **記事一覧の残り** — `ArticleThumbnail` `Pagination` `CategorySectionHeader` `ArticleSectionHeading`
4. **記事本文** — `ArticleH1`〜`H3` → `Paragraph` `Quote` `BulletItem` `NumberItem` → `Callout` `CodeBlock` `Table` `Bookmark`
5. **ページ組み立て** — ~~`ArticleListPage`~~（実装済み）→ `ServiceDetailPage`
6. **Shelf 一式**（他から独立しているのでいつでも可）
