# blog_microCMS_pages

Next.js と microCMS を使用して構築した、技術的な学びやメモを記録するためのブログです。

## 特徴

- **フレームワーク**: [Next.js](https://nextjs.org/) (App Router)
- **ヘッドレス CMS**: [microCMS](https://microcms.io/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) v4 + `src/app/_styles/tokens.css` のデザイントークン
- **API クライアント**: [microCMS JS SDK](https://github.com/microcmsio/microcms-js-sdk)
- **UI カタログ**: [Storybook](https://storybook.js.org/)
- **テスト**: [Vitest](https://vitest.dev/)

## 環境構築と実行方法

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/monarizzz/blog_microCMS_pages.git
   cd blog_microCMS_pages
   ```

2. **依存関係をインストール**

   ```bash
   npm install
   ```

3. **環境変数を設定**
   `.env.example` ファイルを参考に `.env.local` ファイルを作成し、microCMS の API キーなどを設定してください。

   ```
   MICROCMS_SERVICE_DOMAIN=your-service-domain
   MICROCMS_API_KEY=your-api-key

   # OGP 画像や canonical URL の解決に使うサイトの絶対 URL。
   # ローカル開発 (NODE_ENV !== production) では未設定でも
   # http://localhost:3000 にフォールバックする。
   # 本番ビルドでは未設定だとビルドが失敗するので必ず設定する
   NEXT_PUBLIC_SITE_URL=https://example.com
   ```

   `MICROCMS_SERVICE_DOMAIN` / `MICROCMS_API_KEY` は未設定のまま microCMS へアクセスすると
   エラーで停止します（`src/infra/microCMS/env.ts`）。

4. **開発サーバーを起動**
   ```bash
   npm run dev
   ```
   [http://localhost:3000](http://localhost:3000) にアクセスすると、ブログが表示されます。

## npm scripts

| コマンド                  | 内容                                                   |
| ------------------------- | ------------------------------------------------------ |
| `npm run dev`             | 開発サーバーを起動                                     |
| `npm run build`           | 本番ビルド                                             |
| `npm start`               | ビルド済みの成果物を起動                               |
| `npm run typecheck`       | TypeScript の型チェック (`tsc --noEmit`)               |
| `npm run lint`            | ESLint                                                 |
| `npm run format`          | Prettier で整形                                        |
| `npm run format:check`    | Prettier の差分チェック（整形はしない）                |
| `npm run test`            | Vitest（node 環境のテスト）                            |
| `npm run test:storybook`  | Storybook のストーリーをテストとして実行               |
| `npm run storybook`       | Storybook を起動（http://localhost:6006）              |
| `npm run build-storybook` | Storybook を静的ビルド                                 |

コミット前は `npm run typecheck` / `npm run lint` / `npm run format:check` を通してください。

## ディレクトリ構成

このプロジェクトは、関心事を分離するディレクトリ構造を採用しています。

```
src
├── app/          # App Router のルーティング。_styles/ にグローバルCSS・デザイントークン
├── commons/      # プロジェクト全体で再利用する共通コンポーネント・ロジック
├── features/     # 特定のページ専用のコンポーネント・ロジック（レイアウトを含む）
└── infra/        # microCMS との連携、外部ライブラリの薄いラッパー
```

詳細なアーキテクチャや開発の指針については、[`docs/`](docs/README.md) を参照してください。
ディレクトリごとの配置基準は [`docs/architecture/directory-structure.md`](docs/architecture/directory-structure.md) にあります。
