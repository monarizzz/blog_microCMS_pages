# Design.md

`wire-frame.pen` の現状から起こしたデザイン仕様書。ブログ「The Attic」のワイヤーフレーム定義をまとめる。

- 出典: [wire-frame.pen](wire-frame.pen)（Pencil）
- 基準幅: **880px**（全ページ共通の固定幅・単一カラム）
- 更新日: 2026-07-20

---

## 1. デザイントークン

`.pen` のドキュメント変数として定義済み。テーマ切替（ダークモード）は未定義で、ライト1系統のみ。

### カラー

| 変数 | 値 | 用途 |
| --- | --- | --- |
| `primary` | `#000000` | 見出し・本文の主要テキスト、アクティブ状態 |
| `on-primary` | `#FFFFFF` | primary 背景上のテキスト |
| `secondary` | `#707070` | メタ情報・ラベル・ナビ非アクティブ |
| `on-surface` | `#1a1a1a` | 本文（記事） |
| `on-surface-variant` | `#4f4f4f` | 抜粋・補助本文 |
| `surface` | `#ffffff` | ヘッダー / フッター背景 |
| `surface-bright` | `#fafafa` | InfoCard / ProjectCard 背景 |
| `surface-container` | `#EDEEEF` | StackPill 背景 |
| `surface-container-low` | `#F3F4F5` | タグ・フィルタ・コードブロック背景 |
| `outline` | `#808080` | （予備） |
| `outline-variant` | `#cfcfcf` | 区切り線・カード枠線 |
| `white` | `#FFFFFF` | ページ背景 |

**方針**: 無彩色のみ。彩色アクセントを一切持たず、階層はコントラストとタイポグラフィで表現する。

### タイポグラフィ

| 変数 | フォント |
| --- | --- |
| `font-inter` | Inter（UI・本文・見出し） |
| `font-mono` | JetBrains Mono（日付・ラベル・件数などのメタ情報） |

**タイプスケール**

| 用途 | size | weight | letterSpacing | lineHeight |
| --- | --- | --- | --- | --- |
| ページタイトル / 記事タイトル / Featured | 40 | 700 | -0.5 〜 -0.8 | 1.3 |
| ロゴ | 24 | 700（フッターは600） | -0.5 | — |
| リスト記事タイトル | 20 | 700 | -0.3 | 1.4 |
| 記事本文 / Featured 抜粋 | 18 | normal | 0.2 | 1.8 |
| ナビゲーション | 16 | normal（アクティブ700） | — | — |
| InfoCard 本文 | 16 | normal | 0.2 | 1.75 |
| リスト抜粋 | 15 | normal | 0.2 | 1.75 |
| セクション見出し / タグ / フッターリンク | 13 | 600 | 0.5 〜 1.0 | — |
| 日付・read time（mono） | 13 | normal | 0.5 | — |
| FEATURED ラベル（mono） | 12 | 600 | 1.5 | — |

小さい文字ほど字間を広げ、大きい文字は詰める（負のトラッキング）というルールで統一されている。

### スペーシング

- ページ本文パディング: `64 / 40 / 80 / 40`（上・右・下・左）
- セクション間 gap: **56**（Home / Archive）、**64**（Profile）、**32**（記事詳細）
- 区切りは `outline-variant` の 1px ボーダー（`strokeWidth` の片側指定）で表現し、余白＋罫線でリズムを作る
- 角丸はほぼ使わない（タグ `2`、コードブロック `8`、StackPill `999`）

---

## 2. コンポーネント（reusable）

### AtticHeader `K2xrvp`

- 高さ 64 / 幅 880 / padding `0 40` / `justifyContent: space_between`
- 左: ロゴ「The Attic」（24 / 700）
- 右: Nav（gap 24）= `Home` / `Archive`（`NavArchiveWrap` として下線2px付きラッパー）/ `Profile` / 検索アイコン（feather `search` 20px）
- 下辺 1px ボーダー
- **アクティブ表現**: 該当リンクを `primary` + `700` に、非アクティブは `secondary` + `normal` に上書き。下線ラッパーは非アクティブ時 `strokeWidth: 0` で消す
  - Home ページ → `NavHome` をアクティブ化、Archive の下線を除去
  - Profile ページ → `NavProfile` をアクティブ化

### AtticFooter `VMThv`

- 縦積み / gap 16 / padding `80 40` / 上辺 1px ボーダー
- ロゴ「The Attic」（24 / 600）
- FooterNav（gap 16）: `Archives` `RSS` `Privacy Policy` `Contact`
- コピーライト: `© 2024 The Attic. Built for high-density technical discourse.`
- 記事詳細ページのみコピーライトを `enabled: false` で非表示

### AtticTag `biM87`

- `surface-container-low` 背景 / cornerRadius 2 / padding `4 8`
- ラベル 13 / 600 / letterSpacing 0.5、`#タグ名` 形式
- インスタンス側で `Label` の `content` を差し替えて使う

### AtticPostRow `D7Q2z7`

記事一覧の1行。横並び 2 カラム、gap 32、padding `24 0`、下辺 1px ボーダー。

- **DateCol**（幅 96 固定）: 日付を mono 13 で表示（例 `2024.03.18`）
- **BodyCol**（fill_container / gap 10）
  - タイトル 20 / 700
  - 抜粋 15 / normal（`on-surface-variant`）
  - TagRow: AtticTag インスタンスを gap 8 で並べる

日付を左の固定カラムに追い出すことで、タイトル・抜粋の左端が全行で揃う。

---

## 3. ページ

### 3.1 Home Page `g2GjHX`（880 × 1925）

```
Header
Main (vertical, gap 56, padding 64/40/80/40)
 ├─ Featured        下辺ボーダー、padding-bottom 48
 │   ├─ "FEATURED" ラベル（mono 12 / 字間1.5）
 │   ├─ タイトル 40/700
 │   ├─ 抜粋 18/1.8
 │   └─ MetaRow: タグ / 日付 / "8 min read"
 ├─ LatestSection (gap 8)
 │   ├─ "最新の記事"（13/600）
 │   └─ PostList: AtticPostRow ×n
 └─ MoreLink（中央寄せ）"すべての記事を見る  →"
Footer
```

先頭1件だけを 40px タイトルの Featured として大きく扱い、それ以降を密なリスト行に落とす二段構成。

### 3.2 Archive Page `L6KBj`（880 × 2325）

```
Header
Main (vertical, gap 56)
 ├─ PageHead: "Archive"(40/700) + "38 記事 / 4 カテゴリ"(mono 13)
 ├─ FilterRow: すべて / #Next.js / #設計 / #TypeScript / #テスト
 │   └─ 選択中は fill=primary、非選択は surface-container-low。padding 6/12、角丸2
 └─ Sections (gap 56): タグごとのセクション
     ├─ Section Next.js
     ├─ Section 設計
     └─ Section TypeScript
         各セクション = 見出し + AtticPostRow のリスト
Footer
```

フィルタは見た目上の状態のみで、遷移仕様は本ワイヤーでは未定義。

### 3.3 Article Detail Page `y2xbA`（880 × 2372）

```
Header
Main (vertical, gap 32)
 ├─ Article
 │   ├─ TagRow
 │   ├─ タイトル 40/700/1.3
 │   └─ MetaRow（右寄せ、padding 16/0）
 ├─ ArticleBody (gap 32)
 │   ├─ 段落 18 / lineHeight 1.8
 │   ├─ 見出しラッパー（H2Wrap1〜3）: 下辺1pxボーダー + padding-bottom 8
 │   ├─ リスト（gap 12）
 │   ├─ CodeBlock: 角丸8 / clip / 1px枠
 │   │    ├─ CodeHeader（surface 背景、下辺ボーダー、padding 8/16）
 │   │    └─ CodeBody（padding 16）
 │   └─ InfoCard: surface-bright + 1px枠 + padding 32、本文16/1.75
 └─ PaginationWrap（上辺ボーダー、padding-top 32）
     └─ Pagination: PrevLink（右辺1pxボーダー） / NextLink（右寄せ）
Footer（コピーライト非表示）
```

本文リッチテキストで必要な要素は **段落 / H2 / リスト / コードブロック / 補足カード** の5種。

### 3.4 Profile Page `EAKfF`（880 × 1990）

```
Header（Profile アクティブ）
Main (vertical, gap 64)
 ├─ IdentityHeader: 名前 "Ccc"(40/700/字間-0.8) + Bio(12, 幅520)
 ├─ StackCol: "技術スタック"(13/600) + StackPill 2行
 │    StackPill = surface-container 背景 / 角丸999 / 1px枠 / padding 4-12
 ├─ TimelineSection（高さ840 / padding 0 46）
 │    └─ TimelineList: 左辺2pxボーダー + padding-left 24、TimelineItem ×6（gap 32）
 └─ ProjectsSection
      ├─ ProjHeadWrap（下辺ボーダー、padding-bottom 16）
      └─ ProjectGrid: ProjectCard ×2（横並び gap 24、surface-bright + 1px枠）
Footer
```

---

## 4. デザイン原則

1. **単一カラム 880px 固定** — サイドバーなし。読む導線を一本に絞る
2. **無彩色のみ** — 色ではなく、サイズ・ウェイト・余白で情報階層を作る
3. **カードではなく罫線** — 一覧はカードを積まず、下辺1pxのボーダー行で区切る。囲みは InfoCard / ProjectCard / CodeBlock に限定
4. **メタ情報はモノスペース** — 日付・件数・read time は JetBrains Mono で本文と質感を分ける
5. **角丸は最小限** — 装飾ではなく機能（タグ・ピル・コード領域）にのみ使う

---

## 5. 未定義項目

本ワイヤーには含まれていないため、実装前に決める必要がある。

- レスポンシブ（880px 未満のブレークポイント、モバイルレイアウト）
- ダークモード（テーマ軸が `.pen` に未定義）
- 検索アイコン押下後の UI（検索画面・モーダル）
- ホバー / フォーカス / アクティブなどのインタラクション状態
- 404・ローディング・空状態（`src/app/not-found.tsx` は存在するがワイヤーなし）
- アーカイブのページネーション（記事詳細の前後リンクのみ定義済み）
- 画像・OGP まわりの扱い（サムネイル要素が一切ない）
