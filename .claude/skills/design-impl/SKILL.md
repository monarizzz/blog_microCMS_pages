---
name: design-impl
description: design/v3/ui.pen のコンポーネントを読んで React 実装に落とす。「Tag を実装して」「ui.pen の Callout をコンポーネント化」「デザイン通りに直して」などで起動。/design-impl <コンポーネント名>。引数なしで起動した場合は未実装コンポーネントの一覧を出す。
---

# design-impl

`design/v3/ui.pen`（Pencil）を**正**として、React コンポーネントを実装・更新する。

方向は **デザイン → 実装の一方向のみ**。このスキルは `.pen` を書き換えない。
`.pen` への書き戻しが必要な場合は、その旨をユーザーに伝えて手を止めること。

## 前提

- `.pen` は暗号化形式。**Read / Grep は使えない**。必ず `mcp__pencil__execute` の `Get` 経由で読む。
- `filePath` は常に `design/v3/ui.pen`（絶対パス推奨）。
- `design/` 配下でバージョンディレクトリが増えた場合、**番号が最大のものが正**（`design/README.md`）。このスキルの参照パスも読み替えること。

## 手順

### 1. 対象を特定する

`reference/mapping.md` で pen 側コンポーネント名 ↔ 実装パスの対応を引く。
**名前は一致していない**（pen `Tag` = 実装 `TagBtn` など）。推測せず必ず表を引く。

表にない名前を指定された場合は、まず存在確認する:

```js
Get(n => n.reusable && Print(n.id, n.name))
```

### 2. デザインを読む

```js
Print(Get("<コンポーネントID>", {depth: 4}))
```

- **`resolveVariables` は付けない**（デフォルト false）。付けると `$primary` が `#181b1d` に解決されてしまい、トークン情報が失われる。`$` 参照のまま読むことが、そのまま Tailwind のセマンティッククラスに写す唯一の手がかりになる。
- バリアント（active / compact など）が別ノードとして存在することが多い。`Design System` フレーム（id `Tes6b`）配下の該当セクションに並んでいるので、実装前に全バリアントを確認する。
- 実際の使われ方を見たい場合は、ページ側フレーム（`Home Page` `Article Page` など）でそのコンポーネントの `ref` を探す。

### 3. トークンに変換する

`reference/token-map.md` の換算表に従う。**必ず読むこと。**
色とフォントサイズは pen の変数名がそのまま Tailwind のクラス名になるが、余白・角丸・字間は px からの換算が要る。
また Tailwind 標準とスケールが異なる段（`text-md` `rounded-xs` など）があり、標準の感覚で書くと静かに壊れる。

### 4. 実装する

配置規約（既存に合わせる）:

| 種別 | パス |
| --- | --- |
| ドメイン非依存の汎用 UI | `src/commons/<domain>/components/<Name>/<Name>.tsx` |
| 機能固有 | `src/features/<domain>/components/<Name>/<Name>.tsx` |

既存実装のスタイルに合わせる:

- default export、`type Props = {...}` をファイル内に定義
- Tailwind ユーティリティを JSX に直書き。CSS Modules や `style` 属性は使わない
- 複数コンポーネントで共有する className は `constants/` に切り出す（例: `src/commons/layout/constants/chipStyle.ts` の `CHIP_CLASS_NAME`）
- リンクは `next/link`、アイコンは `lucide-react`
- 同階層に `<Name>.stories.tsx` を作る。既存の stories に書式を合わせること

### 5. 検証する

- `npx tsc --noEmit` で型を通す
- `reference/token-map.md` の「禁止クラス」に該当するものを書いていないか自己チェック
- 実装後、pen 側とバリアントの数が一致しているか確認する

## 引数なしで起動された場合

`reference/mapping.md` の未実装（❌）を一覧し、依存の少ないものから実装順を提案する。
一気に全部作らない。1 コンポーネントずつ、ユーザーの確認を挟む。

## やらないこと

- `.pen` の書き換え（このスキルは読み取り専用）
- `src/styles/tokens.css` / `globals.css` の変更。トークンの追加が必要になったら、それは**デザイン側の不足**なのでユーザーに報告する
- microCMS API との接続。デザイン実装とデータ接続は別フェーズ（データはハードコードのダミーで良い。既存の `ArticleRow.tsx` がその形）
