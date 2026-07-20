# DESIGN.md — The Attic

このドキュメントは「見た目の好みメモ」ではなく、**実装・AI生成の両方が従う設計契約**です。
ここに書かれた方針に反する実装・生成物は、レビューで差し戻します。

---

## 0. Metadata

| 項目 | 値 |
| --- | --- |
| プロダクト名 | The Attic |
| ロケール | `ja-JP`（第一言語は日本語。技術用語として英語が高頻度で混植される） |
| プロファイル | **media**（記事メディア。長文読解を最優先） |
| 出典 | [wire-frame.pen](wire-frame.pen)（Pencil）＋本ドキュメントでの追加決定 |
| 実装 | Next.js (App Router) + Tailwind CSS + microCMS |
| レビュー状態 | 6〜9 章はワイヤー確定（モバイル・表・検索を wire-frame.pen に反映済み）。5・10〜11 章は本ドキュメントの決定のみで実装未反映 |
| 更新日 | 2026-07-20 |

---

## 1. Product Intent

- **何者か**: 技術的な記事を高い密度で読ませることに特化した個人ブログ。
- **主要ユーザー**: 技術記事を腰を据えて読みに来る読者。回遊よりも1記事の読了が価値。
- **文脈**: デスクトップでの長文閲覧が主。モバイルは読了の妨げにならないことが要件。
- **トーン**: 静か・硬質・無装飾。コンテンツより先にUIが目に入ってはいけない。
- **非目標**: 回遊率の最大化、サムネイルによる誘引、ソーシャル的な賑わい。

---

## 2. Visual Keywords

`無彩色` `罫線` `単一カラム` `余白でリズムを作る` `モノスペースのメタ情報`

装飾で階層を作らない。**サイズ・ウェイト・余白・罫線の4つだけ**で情報階層を表現する。

---

## 3. Color System

`.pen` のドキュメント変数として定義済み。

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

以下を契約とする。

- 彩色アクセントを持たない。リンク色による青も使わない（下線・ウェイトで表現する）。
- 情報を**色だけ**で区別しない（タグの種別、フィルタの選択状態も形状差を併用する）。
- 本文系の最小コントラストは `#4f4f4f` on `#ffffff`（約 9:1）まで。これより薄い文字を本文に使わない。
- セマンティック色（success / warning / error）は**未定義**。フォーム実装時に、無彩色原則を壊さない形で別途決める（→ 14章）。

---

## 4. Typography

### 4.1 フォントスタック（契約）

| 役割 | スタック |
| --- | --- |
| 和文・欧文 UI/本文 | `Inter, "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic UI", "Meiryo", sans-serif` |
| 等幅（メタ情報・コード） | `"JetBrains Mono", "SFMono-Regular", Consolas, "Noto Sans JP", monospace` |

- **Inter を先に置き、和文は Noto Sans JP が受ける**。Inter は和文グリフを持たないため、混植時に欧文=Inter / 和文=Noto Sans JP へ自動的に振り分けられる。この順序は必須で、逆にすると欧文まで Noto Sans JP が描画して質感が濁る。
- 和文フォールバックを**必ず最後まで書く**。`sans-serif` 止まりは禁止（Windows で MS Pゴシックに落ちる）。
- 等幅にも和文フォールバックを含める。日付や件数に日本語が混ざった際に欧文等幅が和文を拾えず、豆腐や別フォントへ飛ぶのを防ぐ。
- ウェイトは **400 / 600 / 700 のみ**。合成太字（フェイクボールド）に頼らないよう、使うウェイトは必ず読み込む。

### 4.2 タイプスケール

| 用途 | size | weight | letterSpacing | lineHeight |
| --- | --- | --- | --- | --- |
| ページタイトル / 記事タイトル / Featured | 40 | 700 | -0.5 〜 -0.8px | 1.3 |
| ロゴ | 24 | 700（フッターは600） | -0.5px | — |
| リスト記事タイトル | 20 | 700 | -0.3px | 1.4 |
| 記事本文 / Featured 抜粋 | 18 | 400 | 0.2px | **1.8** |
| ナビゲーション | 16 | 400（アクティブ700） | — | — |
| InfoCard 本文 | 16 | 400 | 0.2px | 1.75 |
| リスト抜粋 | 15 | 400 | 0.2px | 1.75 |
| セクション見出し / タグ / フッターリンク | 13 | 600 | 0.5 〜 1.0px | — |
| 日付・read time（mono） | 13 | 400 | 0.5px | — |
| FEATURED ラベル（mono） | 12 | 600 | 1.5px | — |

小さい文字ほど字間を広げ、大きい文字は詰める（負のトラッキング）。

### 4.3 日本語段落ルール（契約）

- **本文の line-height は 1.75 未満にしない**。記事本文は 1.8 を維持する。media プロファイルの下限。
- **本文の letter-spacing は 0.02em を超えない**。本文 18px の `0.2px` は約 0.011em で適合。
- 13px 以下の **mono ラベル系に限り** `0.5〜1.5px`（0.038〜0.125em）の広い字間を許可する。これは欧文・数字主体のラベルに対する意図的な例外であり、**和文本文には決して適用しない**。
- `font-feature-settings: "palt"`（プロポーショナル詰め）を**本文に全体適用しない**。適用してよいのは 24px 以上の見出し・ロゴのみ。
- 和文に `text-align: justify` を使わない。行末の不揃いより、字間の破綻のほうが読解を阻害する。

---

## 5. Line Breaking（改行戦略）

日本語UIが最も壊れる箇所。**用途ごとに戦略を分ける**のが契約で、全体一括指定は禁止。

### 5.1 大前提

```html
<html lang="ja">
```

`lang` 属性が正しくないと、ブラウザの日本語用の行分割・フォント選択が働かない。
**`lang="jp"` は誤り**（`jp` は国コード、言語コードは `ja`）。→ 現状の実装は誤っている（14章参照）。

### 5.2 本文（記事・抜粋）

```css
html:lang(ja) body {
  line-break: strict;      /* 小書き仮名・長音記号の禁則を厳格に */
  word-break: normal;
  overflow-wrap: anywhere; /* 長いURL・英単語だけを折る */
}
```

- **`word-break: break-all` を全体既定にしない**。英単語が語中で無差別に折れ、可読性を壊す。
- URL のはみ出し対策は `overflow-wrap: anywhere` で行う。`break-all` で殴らない。

### 5.3 見出し

```css
h1, h2, h3 {
  line-break: strict;
  overflow-wrap: anywhere;
  text-wrap: balance;  /* 折り返し行の長さを揃える */
}
```

- 40px の記事タイトルは**モバイルで必ず折り返る**前提で設計する。2〜3行になっても崩れないこと。
- 記事タイトルは microCMS 由来で長さが可変。**文字数上限を前提にした設計をしない**。

### 5.4 折ってはいけない単位

タグ (`#Next.js`)、StackPill、日付 (`2024.03.18`)、`8 min read` は**単語内で折らない**。

```css
.tag, .pill, .meta-date { white-space: nowrap; }
```

`.pen` 上ではこれらは固定幅に収まっているが、日本語タグ名が長い場合に折れると形が崩れる。

### 5.5 和欧混植（mixed-script）

本ブログはタグ・見出しに `Next.js` `TypeScript` `React` が高頻度で現れる。

- 和欧の境界に**手動スペースを入れない**。`text-autospace` かブラウザ既定に任せる（`text-autospace` を使う場合は段階適用し、非対応ブラウザで詰まらないことを確認する）。
- `Next.js` の `.` が行頭に来ないこと（`line-break: strict` で担保）。
- 混植見出しで欧文だけ浮いて見えないよう、Inter と Noto Sans JP の**サイズ差を調整しない**（`font-size-adjust` は使わない。既存の見た目が破綻する）。

---

## 6. Layout

### 6.1 基本方針

- **基準幅 880px 固定・単一カラム**。サイドバーを持たない。読む導線を一本に絞る。
- ページ本文パディング: `64 / 40 / 80 / 40`（上・右・下・左）
- セクション間 gap: **56**（Home / Archive）、**64**（Profile）、**32**（記事詳細）
- 区切りは `outline-variant` の 1px ボーダー（片側指定）。**余白＋罫線でリズムを作る**。
- 角丸はほぼ使わない（タグ `2`、コードブロック `8`、StackPill `999`）。装飾ではなく機能に対してのみ。

### 6.2 ページ構成

各ページのモバイル版は同名 + `(Mobile)`（幅 390）で並置している。

#### Home Page `A232WE`（幅 880）

```text
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

#### Archive Page `wJS3A`（幅 880）

```text
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

フィルタは見た目上の状態のみ。遷移仕様は未定義（→ 15章）。

#### Article Detail Page `y2xbA`（880 × 2372）

```text
Header
Main (vertical, gap 32)
 ├─ Article
 │   ├─ TagRow
 │   ├─ タイトル 40/700/1.3
 │   └─ MetaRow（右寄せ、padding 16/0）
 ├─ ArticleBody (gap 32)   ← 要素の詳細は 7.5・表は 7.6
 └─ PaginationWrap（上辺ボーダー、padding-top 32）
     └─ Pagination: PrevLink（右辺1pxボーダー） / NextLink（右寄せ）
Footer（コピーライト非表示）
```

#### Profile Page `EAKfF`（880 × 1990）

```text
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

Bio は当初 12px だったが、**14px / `on-surface-variant` に確定**した（ワイヤー反映済み）。12px の和文は可読性が厳しく、`secondary` (#707070) は3章の本文系コントラスト下限（#4f4f4f）を下回るため。

#### Search Page

```text
Header（検索アイコンがエントリポイント）
Main (vertical, gap 56)
 └─ SearchSection (gap 24)
     ├─ ラベル「記事を検索」（13/600/字間0.5、常時可視）
     ├─ InputBox（高さ48 / padding 0 16 / 1px枠 primary / 角丸2）
     │    └─ search アイコン20 + 入力値 16/1.5
     ├─ HelpRow: alert-circle アイコン14 + 補助文 13/1.5
     ├─ 「検索結果 2件」（mono 13）
     └─ AtticPostRow ×n
Footer
```

**モーダルではなく専用ページに確定**した（15章の未決定を解消）。理由は8章「影を使わない」との整合で、オーバーレイと `box-shadow` の解禁を回避できるため。

---

## 7. Components

### 7.1 AtticHeader `K2xrvp`

- 高さ 64 / 幅 880 / padding `0 40` / `justifyContent: space_between`
- 左: ロゴ「The Attic」（24 / 700）
- 右: Nav（gap 24）= `Home` / `Archive`（`NavArchiveWrap` として下線2px付きラッパー）/ `Profile` / 検索アイコン（feather `search` 20px）
- 下辺 1px ボーダー
- **アクティブ表現**: 該当リンクを `primary` + `700` に、非アクティブは `secondary` + `normal` に上書き。下線ラッパーは非アクティブ時 `strokeWidth: 0`
  - Home ページ → `NavHome` をアクティブ化、Archive の下線を除去
  - Profile ページ → `NavProfile` をアクティブ化
- **契約**: アクティブ表現をウェイト変更だけに頼らない（下線を併用する）。ウェイト差のみだと和文では判別しづらい。

### 7.2 AtticFooter `VMThv`

- 縦積み / gap 16 / padding `80 40` / 上辺 1px ボーダー
- ロゴ「The Attic」（24 / 600）
- FooterNav（gap 16）: `Archives` `RSS` `Privacy Policy` `Contact`
- コピーライト: `© 2024 The Attic. Built for high-density technical discourse.`
- 記事詳細ページのみコピーライトを非表示（`enabled: false`）

### 7.3 AtticTag `biM87`

- `surface-container-low` 背景 / cornerRadius 2 / padding `4 8`
- ラベル 13 / 600 / letterSpacing 0.5px、`#タグ名` 形式
- **契約**: `white-space: nowrap`。タグ名は microCMS 由来で日本語も入るため、折り返さず1行を保つ。

### 7.4 AtticPostRow `D7Q2z7`

記事一覧の1行。横並び 2 カラム、gap 32、padding `24 0`、下辺 1px ボーダー。

- **DateCol**（幅 96 固定）: 日付を mono 13 で表示（例 `2024.03.18`）
- **BodyCol**（fill_container / gap 10）
  - タイトル 20 / 700
  - 抜粋 15 / 400（`on-surface-variant`）
  - TagRow: AtticTag インスタンスを gap 8 で並べる

日付を左の固定カラムに追い出すことで、タイトル・抜粋の左端が全行で揃う。
**契約**: DateCol は 96px 固定。日付の桁が揃うよう mono を使い、`tabular-nums` を有効にする。

### 7.5 記事本文（リッチテキスト）

microCMS のリッチテキストから出力される要素は **段落 / H2 / リスト / コードブロック / 補足カード** の5種。

- 段落: 18 / lineHeight 1.8
- H2: 下辺1pxボーダー + padding-bottom 8
- リスト: gap 12
- CodeBlock: 角丸8 / clip / 1px枠。Header（surface 背景・下辺ボーダー・padding `8 16`）+ Body（padding 16）
- InfoCard: `surface-bright` + 1px枠 + padding 32、本文 16 / 1.75

以下を契約とする。

- **コードブロックは本文の行間・字間を継承しない**。等幅・`line-height: 1.6`・`letter-spacing: 0` を明示的に再指定する。
- コードブロックは `overflow-x: auto` で横スクロールさせる。折り返さない。
- InfoCard は本文より 1 段小さい 16 / 1.75 で、本文との差を保つ。

### 7.6 表

microCMS のリッチテキストに表が入りうる。記事詳細ページにワイヤーを追加済み。

- 構造: Table（1px枠 / 角丸2 / clip）→ Row → Cell（frame）→ セル内容
- ヘッダー行: `surface-container-low` 背景 + 下辺1pxボーダー、ラベル 13 / 600 / 字間0.5
- データ行: 15 / 400 / 字間0.2 / lineHeight **1.6**、セル padding `10 16`、最終行はボーダーなし
- 数値セル: mono 14 / 字間0.5 / **右揃え**（セルの `justifyContent: end`）

**契約**: 表は**本文ルールを継承しない**。`line-height: 1.6` へ落とし、セル padding で密度を作る。数値セルは mono + `tabular-nums` + 右揃え。880px を超える表、およびモバイル（<600）で列が収まらない表は親を `overflow-x: auto` にする（ページ全体を横スクロールさせない）。

### 7.7 フォーム・検索

**契約**（実装時に必ず従う）

- 入力欄の本文サイズは **16px 未満にしない**（iOS の自動ズームを防ぐ）。
- **プレースホルダーをラベル代わりにしない**。ラベルを常時可視で置く。
- 行間はフォーム用に **1.5** へ落とす。本文の 1.8 を継承すると間延びして窮屈さの逆に散漫になる。
- IME 変換中の文字が欠けない高さを確保する（`line-height` を 1.2 以下にしない）。
- エラーは**色だけで示さない**。テキスト＋アイコンを併用する（無彩色原則との両立）。

---

## 8. Depth

影を使わない。階層は**罫線と背景の明度差のみ**で表す。

- 面の重なり: `surface-bright` (#fafafa) / `surface-container-low` (#F3F4F5) / `surface-container` (#EDEEEF)
- 囲みが許されるのは **InfoCard / ProjectCard / CodeBlock** のみ。一覧をカードで積まない。
- `box-shadow` は将来モーダル（検索UI）を作る場合のオーバーレイに限って解禁を検討する。

---

## 9. Responsive

`.pen` に **390px のモバイル版4画面**（Home / Archive / Article Detail / Profile）を追加済み。

| ブレークポイント | 幅 | 方針 |
| --- | --- | --- |
| Desktop | ≥ 880 | ワイヤー通り。コンテンツ幅 880 固定・中央寄せ |
| Tablet | 600–879 | 幅は流動（`max-width: 880px` + 左右 padding 32）。構造は変えない |
| Mobile | < 600 | 単一カラムを維持。以下を変更 |

モバイル時は以下を契約とする。

- 左右 padding: 40 → **20**
- 記事タイトル 40 → **28**、リスト記事タイトル 20 → **18**
- 本文 18px と **line-height 1.8 は維持する**（読解が主目的のため、ここは削らない）
- `AtticPostRow` を横並び2カラムから**縦積み**へ。DateCol を BodyCol の上に移し、日付→タイトル→抜粋→タグの順にする
- ProjectGrid（Profile）を2列 → 1列
- セクション間 gap: 56 → 40（Profile の 64 → **48**）

以下はワイヤー化の過程で追加決定した（Pencil に行の折り返し機能がないため、実装では flex-wrap で表現してよい）。

- **ヘッダー**: ロゴ + 4項目のナビは 390px にちょうど収まる。ハンバーガーメニューを導入しない（1章の非装飾方針）。ナビの gap を 24 → **16**、ヘッダー/フッターの左右 padding を 40 → **20** に落とす
- **Archive のフィルタ行**: 1行に収まらないため **2行に折り返す**（行間 gap 8）
- **Profile の StackPill / タイムライン項目のタグ列**: 同じく **2行に折り返す**
- **Profile の TimelineSection**: 左右 padding 46 → **0**（ドットは項目の絶対配置のまま維持）
- **Profile の Bio**: 固定幅 520 → `fill_container`
- **InfoCard**: padding 32 → **24**（これ以上は詰めない）
- **表**: 3列のまま維持し、収まらない場合は横スクロール（7.6）

**禁止**: モバイルで余白を潰して密度を上げること。長文読解の妨げになる。上記の padding 縮小は契約で定めた値が上限で、これ以上詰めない。

---

## 10. Motion

- 原則としてアニメーションを持たない。ページ遷移エフェクトを入れない。
- 許可するのは**ホバー・フォーカスの状態変化のみ**、`120ms ease-out` まで。
- `prefers-reduced-motion: reduce` に必ず対応する。
- フォーカスリングを消さない。`outline` を消す場合は同等以上に視認できる代替を必ず置く。

---

## 11. Do's & Don'ts

### Do

- 階層はサイズ・ウェイト・余白・罫線で作る
- メタ情報（日付・件数・read time）は mono で本文と質感を分ける
- 一覧は下辺1pxのボーダー行で区切る
- 和文フォールバックを最後まで書く

### Don't

- 全体既定で `word-break: break-all` を使う
- 本文の line-height を 1.75 未満にする
- 本文に `palt` を全体適用する
- 本文の letter-spacing を 0.02em 超にする
- 表・フォーム・コードに本文の行間をそのまま継承させる
- 彩色アクセントを追加する / リンクを青くする
- 一覧をカード化する
- 情報を色だけで区別する

---

## 12. Agent Guide（AIに生成させるときの指針）

UI を生成させる際は、以下を前提として渡すこと。

1. **本ドキュメントは仕様ではなく契約**。11章の Don't に1つでも触れたら、生成物は不採用。
2. **プロファイルは media**。密度より読みやすさを優先する。迷ったら余白を広く、行間を保つ。
3. **無彩色のみ**。色を足したくなったら、それはサイズ・ウェイト・余白で解くべき問題。
4. **日本語のダミーテキストで生成すること**。Lorem ipsum で作ると和文の行間・折り返しの破綻が見えない。
5. **記事タイトル・タグ名は可変長**（microCMS 由来）。短い文字列前提のレイアウトを作らない。長いタイトル・長いタグ名でも確認する。
6. 既存コンポーネント（7章）がある要素は**新規に作らず再利用する**。
7. 5章の改行戦略は**用途ごとに分けて**書く。`body` に一括指定しない。

---

## 13. Validation

生成・実装のあとに必ず通す。

### 13.1 Reject（1つでも該当したら差し戻し）

1. 全体既定で `word-break: break-all` を使っている
2. 本文に 0.02em を超える letter-spacing を根拠なく当てている
3. 長文本文の line-height が 1.75 未満
4. 和文フォントの fallback が `sans-serif` 止まり
5. `palt` を本文に全体適用している
6. 表・フォーム・コードブロックが本文ルールを継承している
7. `<html lang>` が `ja` でない
8. 無彩色以外の色が追加されている
9. 情報の区別が色のみに依存している

### 13.2 Warn（確認して記録を残す）

- `text-autospace` を段階適用なしで使っている
- モバイル（<600）での折り返しを未確認
- 和欧混植の見出しを実データで未確認
- 長いURLのはみ出し対策が未確認
- Windows（Yu Gothic UI / Meiryo）での描画を未確認
- フォーカス可視状態を未確認

### 13.3 目視チェックリスト

```text
1. 長文本文     → 詰まり、行間、字間の不自然さ
2. 見出し       → モバイル折れ、和欧混植の崩れ
3. URL/長い語   → はみ出し、対策による本文破壊
4. フォーム     → ラベル可読性、IME、エラー表示
5. 表           → 行高、数値の視認性、折り返し
6. mixed-script → 英語の浮き、潰れ
7. モバイル     → 余白潰れ、読みと操作の両立
8. コントラスト → 薄さ、色依存の回避
```

### 13.4 運用サイクル

```text
DESIGN.md を書く → 生成/実装 → 目視 → validator の観点で差分を記録
  → 契約へ戻して修正 → 再生成
```

一発で当てにいかず、短いサイクルを回す。**目視で見つかった破綻は、直す前に本ドキュメントへ反映する**（同じ破綻を二度生成させないため）。

---

## 14. 既知の乖離（実装 vs 契約）

実装が本契約に未追従の箇所。着手前に解消すること。

| # | 箇所 | 現状 | あるべき姿 |
| --- | --- | --- | --- |
| 1 | [src/app/layout.tsx](src/app/layout.tsx) | 等幅は Fira Code | `.pen` は JetBrains Mono。**どちらかに寄せる**（本契約は JetBrains Mono を正とする） |
| 2 | [src/app/layout.tsx](src/app/layout.tsx) | Google Fonts を `<link>` で読み込み | `next/font` に寄せる（レイアウトシフトと FOUT の回避） |
| 3 | [tailwind.config.ts](tailwind.config.ts) | shadcn 既定の**彩色**トークンのまま | 3章の無彩色トークンに置き換える。`--chart-*` は未使用なら削除 |
| 4 | [src/styles/globals.css](src/styles/globals.css) | 改行戦略の指定が一切ない | 5章を実装する |
| 5 | [src/styles/globals.css](src/styles/globals.css) | `.dark` トークンが定義済み | ダークモードは**未定義**（15章）。使わないなら削除し、意図しない適用を防ぐ |
| 6 | 全ページ | レスポンシブ未実装 | 9章のモバイル指定（[wire-frame.pen](wire-frame.pen) の `(Mobile)` 4画面）を実装する |
| 7 | 記事詳細 | 表のスタイル未実装 | 7.6 を実装する（本文の行間を継承させない） |
| 8 | 検索 | 未実装 | 6.2 の Search Page と 7.7 のフォーム契約を実装する |

### 解消済み

- `<html lang="jp">` → **`lang="ja"`** に修正（Reject 条件 7）
- `body { font-family: Arial, sans-serif; }` → 4.1 のスタックを適用（Reject 条件 4）
- Inter 未読み込み → `Inter:wght@400;600;700` を追加し、Noto Sans JP にも 600 を追加（4.1 の「使うウェイトは必ず読み込む」に対応）

---

## 15. 未決定事項

決めてから実装する。

- **ダークモード** — `.pen` にテーマ軸がなく、無彩色のみのデザインでは単純反転が成立しない（`#000` ↔ `#fff` の反転はコントラストが強すぎる）。やるなら別途トークン設計が必要。現状は**ライト1系統のみ**を正とする。
- ~~**検索UI**~~ — **専用ページに確定**（6.2 参照）。残る未決定は「検索の実行方式（サーバー検索か、クライアント側の絞り込みか）」のみ。
- **アーカイブのページネーション** — 記事詳細の前後リンクのみ定義済み。一覧側は未定義。
- **アーカイブのフィルタ挙動** — ワイヤー上は見た目の状態のみ。URL 連動するか、クライアント絞り込みか未定。
- **画像・OGP** — ワイヤーにサムネイル要素が一切ない。記事本文中の画像の扱い（幅・キャプション・角丸）も未定義。
- **404 / ローディング / 空状態** — `src/app/not-found.tsx` は存在するがワイヤーなし。
- **セマンティック色** — フォーム実装時に、無彩色原則を壊さない形で決める（3章）。
