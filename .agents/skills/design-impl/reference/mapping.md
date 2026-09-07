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
| `Service`（トップレベル group・reusable ではない） | `olqvM` | `src/features/service/components/ServicePageMain/ServicePageMain.tsx` | ✅ ルートは `src/app/service/page.tsx` |
| `Profile`（トップレベル group・reusable ではない） | `t9pvP` | `src/features/profile/components/ProfilePageMain/ProfilePageMain.tsx` | ✅ ルートは `src/app/profile/page.tsx` |
| `ServiceDetailPage` | `qiFnK` | `src/features/service/components/ServiceDetailMain/ServiceDetailMain.tsx` | ✅ ルートは `src/app/service/[id]/page.tsx` |
| `Tags`（group `j9tOQT`・reusable ではない） | `wJS3A` | `src/features/tags/components/TagsPageMain/TagsPageMain.tsx` | ✅ ルートは `src/app/tags/page.tsx` |

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
| `PageHeader` | `XEUvq` | `src/commons/other/components/PageHeader/PageHeader.tsx` | 🟡 標準形と `compact` / `wide` / `hero` のみ |
| `ScrollNav` | `qXMlW` | `src/commons/navigation/components/ScrollNav/ScrollNav.tsx` | ✅ |
| `ScrollTopButton` | `YJxBa` | — | ❌ |

- `src/features/layout/components/LayoutMain/LayoutMain.tsx` は pen に対応物なし（実装都合の骨組み）
- `PageHeader` の未対応バリアント（pen 側インスタンスの上書き）:
  - ~~`Hero`（`sHYtM`）— gap 14~~ → `hero` prop で実装済み
  - `PageHead`（`TzqGY`）— gap `$space-8` / Sub の `lineHeight` 1.6
  - ~~`PageHead`（`nrspz`）— Sub が `$text-base` / 幅 560~~ → `wide` prop で実装済み
  - `Intro`（`UmjU2`）— gap 18 / padding 付き / Kicker が `$font-mono` `letterSpacing` 2 /
    Title は `letterSpacing` -0.3（`tracking-snug`）
  - 実装済みは標準形（gap-4・`text-4xl`・`tracking-tighter`）、
    `compact`（`MyXLm` 相当: gap-3・`text-3xl`・`tracking-tight`）、
    `wide`（`nrspz` 相当: Sub が `text-base`・幅 560）、
    `hero`（`sHYtM` 相当: gap-3.5）の4種類

## 記事一覧・記事メタ

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `ArticleRow` | `D7Q2z7` | `src/commons/contents/components/ContentsRow/ContentsRow.tsx` | ✅ 実装名は `ContentsRow`（記事以外のコンテンツにも使うため） |
| `ArticleRowCompact` | `JE7aw` | 同上（`ContentsRow` の `compact` prop で兼用） | ✅ |
| `Tag` | `biM87` | `src/commons/button/components/TagBtn/TagBtn.tsx` | ✅ |
| `SeeAllLink` | `ZRLCv` | `src/commons/other/components/SeeAllRight/SeeAllRight.tsx` | ✅ |
| `Pagination` | `uxLwl` | `src/commons/navigation/components/PageNumNav/PageNumNav.tsx` | ✅ |
| `ArticleThumbnail` | `N7jyll` | `src/commons/other/components/ImagePlaceholder/ImagePlaceholder.tsx` | ✅ `ImagePlaceholder` (`XHkBO`) と用途が同じため統合 |
| `CategorySectionHeader` | `QSeNC` | `src/commons/contents/components/CategorySectionHeader/CategorySectionHeader.tsx` | ✅ |
| `ArticleSectionHeading` | `RgUbK` | `src/commons/contents/components/ArticleSectionHeading/ArticleSectionHeading.tsx` | ✅ |

- `src/commons/button/components/FilterBtn/FilterBtn.tsx` は `Tag` の `#` なし版。
  pen 側に独立コンポーネントはなく、`Tags` ページ（group `j9tOQT`）のフィルタ行が出典。
  `Tag` を触る時は `CHIP_CLASS_NAME`（`src/commons/other/constants/chipStyle.ts`）を共有しているので巻き添えに注意。
  `ArticleListPage` のソート行（`SortRow` `vV5Py`）は未実装。選択/非選択の色は `FilterBtn` と
  同じで padding だけ 6/12（`Tag` の override）なので、実装時に `FilterBtn` を再利用するか
  別コンポーネントにするかを決めること。

## テキスト・ラベル

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `SectionLabel` | `TbTSl` | `src/commons/other/components/SectionLabel/SectionLabel.tsx` | ✅ |
| `InfoLabel` | `PHZV0` | `src/commons/other/components/InfoLabel/InfoLabel.tsx` | ✅ |
| `MetaText` | `E2rKp` | `src/commons/other/components/MetaText/MetaText.tsx` | ✅ |
| `Paragraph` | `g5WYtH` | `src/commons/contentsDetail/components/Paragraph/Paragraph.tsx` | ✅ |

## 記事本文（リッチエディタ由来の要素）

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `ArticleH1` | `Y5MxdQ` | `src/commons/contentsDetail/components/ArticleH1/ArticleH1.tsx` | ✅ |
| `ArticleH2` | `sSgdW` | `src/commons/contentsDetail/components/ArticleH2/ArticleH2.tsx` | ✅ |
| `ArticleH3` | `v0Atx` | `src/commons/contentsDetail/components/ArticleH3/ArticleH3.tsx` | ✅ |
| `Callout` | `KaNJF` | `src/commons/contentsDetail/components/Callout/Callout.tsx` | ✅ pen は単一バリアント（背景 `$surface-container-low`）。`$ac-*-bg` は使っていない |
| `Quote` | `xR0ql` | `src/commons/contentsDetail/components/Quote/Quote.tsx` | ✅ |
| `BulletItem` | `eQqNb` | `src/commons/contentsDetail/components/BulletItem/BulletItem.tsx` | ✅ |
| `NumberItem` | `c3XVs` | `src/commons/contentsDetail/components/NumberItem/NumberItem.tsx` | ✅ |
| `Checkbox` | `D1pbg` | `src/commons/contentsDetail/components/Checkbox/Checkbox.tsx` | ✅ |
| `Toggle` | `HbAE1` | `src/commons/contentsDetail/components/Toggle/Toggle.tsx` | ✅ |
| `Divider` | `Ar2tj` | `src/commons/other/components/Divider/Divider.tsx` | ✅ |
| `CodeBlock` | `qvMsD` | `src/commons/contentsDetail/components/CodeBlock/CodeBlock.tsx` | ✅ |
| `Table` | `Y1rfsy` | `src/commons/contentsDetail/components/Table/Table.tsx` | ✅ |
| `Bookmark` | `A4rGR` | `src/commons/contents/components/Bookmark/Bookmark.tsx` | ✅ |

これらは microCMS のリッチエディタ HTML を変換して当てる想定
（`microcms-rich-editor-handler` / `cheerio` が依存に入っている）。
**ただしデータ接続は別フェーズ**。このスキルでは見た目のコンポーネントまで作る。

## ボタン・フォーム

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `SearchInput` | `Jh09L` | `src/features/search/components/SearchInput/SearchInput.tsx` | ✅ |
| `IconButton` | `aGtFB` | `src/commons/button/components/IconBtn/IconBtn.tsx` | ✅ |
| `SearchIconButton` | `k2xlJ` | `src/commons/button/components/SearchIconButton/SearchIconButton.tsx` | ✅ |
| `LinkButton` | `Rl2z4` | `src/commons/button/components/LinkButton/LinkButton.tsx` | ✅ アイコンは `icon` prop で `external-link` / `github` |
| `BackLink` | `r2KGU` | `src/commons/other/components/BackLink/BackLink.tsx` | ✅ |
| `PrimaryButton` | `N3GA43` | `src/commons/button/components/PrimaryButton/PrimaryButton.tsx` | ✅ |

## サービス・プロフィール

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `ServiceCard` | `jhtzh` | `src/features/service/components/ServiceCard/ServiceCard.tsx` | ✅ タイトルは `h2`（`Service` 一覧の `h1` 直下でのみ使う前提） |
| `ServiceCardRow` | `T2ai0` | `src/features/service/components/ServiceCardRow/ServiceCardRow.tsx` | ✅ |
| `ProjectItem` | `XiMk9` | `src/commons/profile/components/ProjectItem/ProjectItem.tsx` | ✅ |
| `InfoRow` | `Nle6p` | `src/commons/service/components/InfoRow/InfoRow.tsx` | ✅ 内部の `InfoLabel`(`PHZV0`)は独立コンポーネント化せず内包 |
| `ShareBar` | `VyBtl` | `src/commons/contentsDetail/components/ShareBar/ShareBar.tsx` | ✅ |
| （reusable なし。`Profile` group のタイムライン目盛り `YBl0K` / `knPPs` / `O3yfbV`） | — | `src/commons/profile/components/TimelineMarker/TimelineMarker.tsx` | ✅ |

## Shelf（本棚）

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `ShelfBook` | `AXiNC` | — | ❌ |
| `ShelfNote` | `mqZTV` | `src/features/shelf/components/ShelfNote/ShelfNote.tsx` | ✅ 寸法は `size` 3 段に畳んだ |
| `ShelfLabel` | `C0GFq` | `src/features/shelf/components/ShelfLabel/ShelfLabel.tsx` | ✅ 見出しは `h2` 固定 |
| `ShelfPlank` | `T42nPd` | `src/features/shelf/components/ShelfPlank/ShelfPlank.tsx` | ✅ 装飾のみなので `aria-hidden` |

Shelf は横スクロールする仕様。`Home Page — Shelf (案)`（frame `hdLAj`）が配置の参考。

## メディア・スケルトン

| pen | ID | 実装 | 状態 |
| --- | --- | --- | --- |
| `ImagePlaceholder` | `XHkBO` | `src/commons/other/components/ImagePlaceholder/ImagePlaceholder.tsx` | ✅ |
| `ArticleRowSkeleton` | `M4eia` | `src/commons/contents/components/ContentsRowSkeleton/ContentsRowSkeleton.tsx` | ✅ 実装名は `ContentsRowSkeleton`（`ContentsRow` に合わせた） |
| `ArticleCardSkeleton` | `Pacnv` | — | ❌ |

スケルトンの並べ方は `Skeleton Demo (Loading)`（frame `ogaR6`）に
`ListLoading` / `GridLoading` として置かれている。
アニメーションは `tailwindcss-animate` が入っているので `animate-pulse` 相当を使う。

---

## 実装の推奨順

依存の少ないものから。上ほど先。

1. **葉のパーツ** — ~~`SectionLabel`~~（実装済み） `MetaText` ~~`InfoLabel`~~（実装済み） ~~`Divider`~~（実装済み） ~~`ImagePlaceholder`~~（実装済み）
2. **ボタン類** — ~~`LinkButton`~~（実装済み） ~~`BackLink`~~（実装済み） ~~`SearchIconButton`~~（実装済み）
3. **記事一覧の残り** — ~~`ArticleThumbnail`~~（`ImagePlaceholder` に統合） ~~`ArticleSectionHeading`~~（実装済み）
4. ~~**記事本文**~~ — 全て実装済み（`ArticleH1`〜`H3` / `Callout` / `Quote` / `BulletItem` / `NumberItem` / `CodeBlock` / `Table` / `Bookmark`）
5. ~~**ページ組み立て**~~ — 全て実装済み（`ArticleListPage` / `Service` / `Profile` / `ServiceDetailPage`）
6. **Shelf 一式**（他から独立しているのでいつでも可）
