# ディレクトリ構造

プロジェクトのディレクトリ構造について説明します。

## プロジェクト全体構造

```text
blog_microcms_pages/
├── design/                  # デザインに関するファイル
├── docs/                    # プロジェクトドキュメント
├── public/                  # Next.jsの静的ファイル
├── src/                     # ソースコード（メインディレクトリ）
├── package.json             # パッケージ依存関係
├── README.md                # プロジェクト概要
└── tsconfig.json            # TypeScript設定
```

## 主要ディレクトリ詳細

### `/src` - ソースコードディレクトリ

アプリケーションのメインソースコードを格納するディレクトリです。

#### `/src/app` - Next.js ページ

Next.js のファイルベースルーティングに従ったページ定義です。

```text
app/
├── _styles/              # グローバルCSS・デザイントークン
│   ├── globals.css
│   └── tokens.css
├── article/              # 記事ページ
├── tags/                 # タグごとの記事ページ
├── service/              # サービスページ
├── profile/              # プロフィールページ
├── search/               # 検索ページ
├── layout.tsx
├── not-found.tsx         # 404エラーページ
└── page.tsx              # ホームページ
```

#### `/src/commons`、`/src/features` - 共通ディレクトリ構造

**`/src/commons`、`/src/features`は同じディレクトリ構造を持ちます。**
違いは「利用目的と範囲」であり、内部構造は統一されています。

##### 共通のディレクトリ構造

どちらのディレクトリも以下の統一された構造を持ちます：

```text
commons/ または features/
├── [機能名]/
│   ├── components/      # React コンポーネント（[詳細なコンポーネント構造ルール](./component-structure.md)）
│   ├── hooks/           # カスタムフック
│   ├── types/           # TypeScript 型定義
│   ├── utils/           # ユーティリティ関数
│   └── constants/       # 定数定義
```

##### `/src/commons` - 共通ロジック・コンポーネント

**プロジェクト全体で再利用されるビジネスロジック・ドメインロジック**を格納します。

**配置基準:**

- 複数のページで使用されるコンポーネント、hooks、ユーティリティ
- ドメイン横断的な共通処理
- プロジェクト全体で再利用可能なビジネスロジック

**具体例:**

```text
commons/
├── button/               # ボタン関連
├── contents/             # 記事一覧などのコンテンツ表示
├── contentsDetail/       # コンテンツ詳細表示
├── navigation/           # ナビゲーション
├── other/                # 上記に分類されない共通要素
├── profile/              # プロフィール関連
└── service/              # サービス関連
```

##### `/src/features` - 特定ページ専用ファイル

**特定のページでのみ使用するファイル**を格納します。機能別のモジュールではなく、**ページ固有の実装**を配置します。

**配置基準:**

- 特定の URL パス（ページ）でのみ使用されるコンポーネント、hooks、ユーティリティ
- そのページから離れると不要になるロジック
- ページ特有のビジネスロジックや状態管理

**具体例:**

```text
features/
├── article/                    # /article/[slug] ページ専用
│   └── components/
│       └── articlePage/        # 記事ページのメインコンポーネント
├── layout/                     # 全ページ共通のレイアウト
│   ├── components/
│   │   ├── Header/
│   │   ├── GlobalNav/
│   │   ├── Footer/
│   │   └── LayoutMain/
│   └── constants/
├── search/                     # /search ページ専用
│   ├── components/
│   │   ├── SearchInput/
│   │   └── SearchPageMain/
│   └── constants/
└── tags/                       # /tags ページ専用
    └── components/
        └── TagsPageMain/
```

#### `/src/infra` - インフラストラクチャ層

外部サービスとの連携やデータアクセス層を管理します。

```text
infra/
├── microCMS/
│   ├── api/              # データアクセス関数
│   ├── schema/           # エンティティ定義
│   └── client.ts
└── Tailwind/
    └── cn.ts             # クラス名結合ユーティリティ
```

### その他の主要ディレクトリ

#### `/docs` - ドキュメント

プロジェクト関連のドキュメントを格納します。

```text
docs/
├── README.md                     # ドキュメント全体の入口
└── architecture/                 # アーキテクチャドキュメント
    ├── directory-structure.md    # ディレクトリ構造（このドキュメント）
    ├── component-structure.md    # コンポーネント構造ルール
    └── data-model.md             # データモデル
```

#### `/public` - 静的ファイル

Next.js の静的ファイル配信用ディレクトリです。

```text
public/
├── favicon.ico           # ファビコン
└── *.svg                 # アイコン類（arrow / callout / home / update など）
```
