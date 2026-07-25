# コンポーネント設計

`commons/` `features/` に置く **`components/` の中をどう作るか** のルール。
「どのディレクトリに置くか」の判断基準は [directory-structure.md](./directory-structure.md) を参照。

## ファイル構成

**1 コンポーネント = 1 ディレクトリ**。ディレクトリ名とファイル名を一致させる。

```text
components/
└── BlogCard/                 # PascalCase
    ├── BlogCard.tsx          # 本体（ディレクトリ名と同名）
    └── BlogCard.stories.tsx  # Storybook
```

- ディレクトリ名・ファイル名・コンポーネント名の 3 つをすべて一致させる
- `index.ts` は作らない。import パスは `.../BlogCard/BlogCard` と最後まで書く
- 1 ファイルに 2 つ以上のコンポーネントを定義しない。分けたくなったら別ディレクトリを切る

## 実装の型

```tsx
type Props = {
 propName: string
};

const Component = ({ propName }: Props) => {
  return <div className="...">...</div>;
};

export default Component;
```

- **アロー関数 + default export** で統一する
- Props の型名は常に `Props`。分割代入で受け取る
- 他コンポーネントから使う場合のみ `export type Props` にする
- 使わなくなった Props は残さず消す

## Props の型をどこに置くか

| 型 | 置き場所 |
|---|---|
| そのコンポーネント専用 | コンポーネントファイル内に `type Props` |
| 複数コンポーネントで共有する | `<機能>/types/` に切り出す（例: `features/blog/types/blogNavigation.ts`） |
| microCMS のレスポンス由来 | `libs/microCMS/schema/` の型をそのまま使う |

- 型名がグローバルの型と衝突する場合は `Type` を付けて回避する（例: `TocType`）

## 分割の粒度

**「単体」と「まとまり」を別コンポーネントに分ける。**

| まとまり | 単体 | 役割分担 |
|---|---|---|
| `BlogCardGrid` | `BlogCard` | Grid 側がレイアウトと `key`、Card 側が見た目 |
| `PageNav` | `PageNavBtn` | Nav 側が前後の振り分け、Btn 側が 1 個の描画 |
| `TagButton` | `TagButtonText` | 同上 |

- **配列を `map` する場所**が分割点。`map` する側（まとまり）は並べ方だけを持ち、中身の見た目は単体側に閉じる
- 単体側は配列を受け取らない。1 件分の Props だけを受け取る

### `*Main` はページのルート

`HomePageMain` `BlogMain` `LayoutMain` のように、**ページ全体の組み立て役**にだけ `Main` を付ける。

- `src/app/**/page.tsx` はデータ取得だけを行い、描画は `*Main` に渡す
- `*Main` は `features/<ページ名>/components/<コンポーネント名>/` に置く

## Server / Client Component

- `"use client"` は state・イベントハンドラ・ブラウザ API が必要な場合に限る
- 付ける場合は**できるだけ最小単位のコンポーネントに付ける**。

## スタイル

**原則 Tailwind CSS。** クラスは `className` に直接書く。

- デザイントークンは `tailwind.config.ts` 経由で参照する。生の値を直接書かない

### 条件によるスタイル切り替え

**`cn()`（`@/lib/utils`）を使う**

```tsx
import { cn } from "@/lib/utils";

<Link
  className={cn(
    "flex min-w-0 flex-1 items-center rounded-lg border border-slate-300 p-4",
    isNext && "flex-row-reverse text-right",
  )}
>
```

使い分け:

| 状況 | 手段 |
|---|---|
| 条件なし（静的） | 文字列をそのまま `className` に書く |
| ON/OFF や数個の条件 | `cn()` |
| `variant` / `size` など多軸のバリアント | `cva()`（class-variance-authority） |

> `cn()` の中もクラス並び替えの対象にするには、`prettier.config.js` に `tailwindFunctions: ["cn"]` の指定が必要。


## Storybook

`*.stories.tsx` を**コンポーネントと同じディレクトリ**に置く。

**必須の対象**: 単体で見た目が確認できるコンポーネント（`BlogCard` `TagButton` `PageNavBtn` `Header` など）
**不要**: ページ組み立て役（`*Main`）と、データ取得結果を丸ごと受け取るだけのもの（`CategorizedBlogList` など）

```tsx
const meta: Meta<typeof BlogCard> = {
  component: BlogCard,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof BlogCard>;

export const Default: Story = { args: defaultArgs };
```

- `Default` は必ず用意する
- 加えて**崩れやすい条件**をストーリーにする（長いタイトル、タグ複数、空の場合など）
- 使わなくなった args はコメントアウトで残さず削除する

## import

- **同じ機能ディレクトリ内** … 相対パス（`../PostDate/PostDate`）
- **機能をまたぐ** … `@/` エイリアス（`@/commons/tag/components/TagButton/TagButton`）
