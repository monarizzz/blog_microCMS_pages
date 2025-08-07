# GEMINI.md

このファイルは、Gemini AI がこのプロジェクトの開発を支援するためのガイダンスを提供します。

## プロジェクト概要

このプロジェクトは、Next.js と microCMS で構築されたブログです。microCMS API からブログ記事やカテゴリを取得し、静的ページとして表示します。

## コーディングスタイル

- **言語:** TypeScript
- **フォーマット:** `.eslintrc.mjs` と `prettier.config.js` で定義されたルールに従います。コードは保存時に自動的にフォーマットされます。
- **命名規則:**
  - **コンポーネント:** PascalCase (例: `BlogCard.tsx`)
  - **変数と関数:** camelCase (例: `getBlogPosts`)
  - **CSS Modules:** camelCase (例: `BlogCard.module.css`)
  - **ファイル:** React コンポーネントを除き、すべてのファイルに kebab-case を使用します。

## ライブラリとフレームワーク

- **フレームワーク:** [Next.js](https://nextjs.org/)
- **UI ライブラリ:** [React](https://reactjs.org/)
- **スタイリング:**
  - [Tailwind CSS](https://tailwindcss.com/): グローバルスタイルとユーティリティクラスに使用します。
  - [CSS Modules](https://github.com/css-modules/css-modules): コンポーネントレベルのスタイルに使用します。
- **API クライアント:** [microCMS JS SDK](https://github.com/microcmsio/microcms-js-sdk) を使用して、microCMS ヘッドレス CMS からデータを取得します。
- **HTML パーサー:** [Cheerio](https://cheerio.js.org/) を使用して HTML を解析します。特に目次作成に使用します。
- **日付フォーマット:** [Day.js](https://day.js.org/) を使用して日付をフォーマットします。

## アーキテクチャ

このプロジェクトは、関心事を`src/commons`, `src/features`, `src/infra`, `src/libs`, `src/pages`に分離するディレクトリ構造に従います。

- **`src/pages`**: Next.js のファイルシステムベースのルーティングに従い、アプリケーションのメインページを格納します。
- **`src/commons`**: アプリケーション全体で共有される再利用可能なコンポーネント、レイアウト、ユーティリティ関数を格納します。
- **`src/features`**: ブログなど、アプリケーションの特定の機能に関連するコンポーネントとロジックを格納します。
- **`src/infra`**: microCMS のような外部サービスとの通信を担当するインフラストラクチャ層を格納します。これには API クライアントやデータリポジトリが含まれます。
- **`src/libs`**: アプリケーションのドメインに特化していないライブラリやユーティリティ関数を格納します。

## microCMS からのデータ取得方法

このプロジェクトでは、`microcms-js-sdk`を使用して microCMS からデータを取得します。クライアントは`src/libs/microCMS/utils/client.ts`で初期化されています。

データを取得するには、`src/infra/microCMS/repositories`にある関数を使用します。

- **ブログ記事のリスト:** `src/infra/microCMS/repositories/blog.ts` の `getBlogList` 関数
- **カテゴリのリスト:** `src/infra/microCMS/repositories/categories.ts` の `getCategoriesList` 関数

## テスト

[テストの実行方法に関する指示は、ここに追記予定です。]
