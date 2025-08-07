# GEMINI.md

このファイルは、Gemini AIがこのプロジェクトの開発を支援するためのガイダンスを提供します。

## プロジェクト概要

このプロジェクトは、Next.jsとmicroCMSで構築されたブログです。microCMS APIからブログ記事やカテゴリを取得し、静的ページとして表示します。

## コーディングスタイル

- **言語:** TypeScript
- **フォーマット:** `.eslintrc.mjs` と `prettier.config.js` で定義されたルールに従います。コードは保存時に自動的にフォーマットされます。
- **命名規則:**
    - **コンポーネント:** PascalCase (例: `BlogCard.tsx`)
    - **変数と関数:** camelCase (例: `getBlogPosts`)
    - **CSS Modules:** camelCase (例: `BlogCard.module.css`)
    - **ファイル:** Reactコンポーネントを除き、すべてのファイルにkebab-caseを使用します。

## ライブラリとフレームワーク

- **フレームワーク:** [Next.js](https://nextjs.org/)
- **UIライブラリ:** [React](https://reactjs.org/)
- **スタイリング:**
    - [Tailwind CSS](https://tailwindcss.com/): グローバルスタイルとユーティリティクラスに使用します。
    - [CSS Modules](https://github.com/css-modules/css-modules): コンポーネントレベルのスタイルに使用します。
- **APIクライアント:** [microCMS JS SDK](https://github.com/microcmsio/microcms-js-sdk) を使用して、microCMSヘッドレスCMSからデータを取得します。
- **HTMLパーサー:** [Cheerio](https://cheerio.js.org/) を使用してHTMLを解析します。特に目次作成に使用します。
- **日付フォーマット:** [Day.js](https://day.js.org/) を使用して日付をフォーマットします。

## アーキテクチャ

このプロジェクトは、関心事を`src/commons`, `src/features`, `src/infra`, `src/libs`, `src/pages`に分離するディレクトリ構造に従います。

- **`src/pages`**: Next.jsのファイルシステムベースのルーティングに従い、アプリケーションのメインページを格納します。
- **`src/commons`**: アプリケーション全体で共有される再利用可能なコンポーネント、レイアウト、ユーティリティ関数を格納します。
- **`src/features`**: ブログなど、アプリケーションの特定の機能に関連するコンポーネントとロジックを格納します。
- **`src/infra`**: microCMSのような外部サービスとの通信を担当するインフラストラクチャ層を格納します。これにはAPIクライアントやデータリポジトリが含まれます。
- **`src/libs`**: アプリケーションのドメインに特化していないライブラリやユーティリティ関数を格納します。

## microCMSからのデータ取得方法

このプロジェクトでは、`microcms-js-sdk`を使用してmicroCMSからデータを取得します。クライアントは`src/libs/microCMS/utils/client.ts`で初期化されています。

データを取得するには、`src/infra/microCMS/repositories`にあるリポジトリ関数を使用します。例えば、ブログ記事のリストを取得するには、`src/infra/microCMS/repositories/blog.ts`の`getBlogs`関数を使用します。

## テスト

[テストの実行方法に関する指示は、ここに追記予定です。]