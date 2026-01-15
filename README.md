# blog_microCMS_pages

Next.js と microCMS を使用して構築した、技術的な学びやメモを記録するためのブログです。

## 特徴

- **フレームワーク**: [Next.js](https://nextjs.org/) (Pages)
- **ヘッドレス CMS**: [microCMS](https://microcms.io/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) & [CSS Modules](https://github.com/css-modules/css-modules)
- **UI**: [React](https://reactjs.org/)
- **API クライアント**: [microCMS JS SDK](https://github.com/microcmsio/microcms-js-sdk)

## 環境構築と実行方法

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/your-username/blog_microcms_pages.git
   cd blog_microcms_pages
   ```

2. **依存関係をインストール**

   ```bash
   npm install
   ```

3. **環境変数を設定**
   `.env.local.example` ファイルを参考に `.env.local` ファイルを作成し、microCMS の API キーなどを設定してください。

   ```
   MICROCMS_SERVICE_DOMAIN=your-service-domain
   MICROCMS_API_KEY=your-api-key
   ```

4. **開発サーバーを起動**
   ```bash
   npm run dev
   ```
   [http://localhost:3000](http://localhost:3000) にアクセスすると、ブログが表示されます。

## ディレクトリ構成

このプロジェクトは、関心事を分離するディレクトリ構造を採用しています。

```
src
├── commons/      # 共通コンポーネント、レイアウト
├── features/     # 特定の機能（ブログなど）に関連するコンポーネント
├── infra/        # microCMSとの連携
├── libs/         # 汎用的なライブラリ
├── pages/        # Next.jsのルーティング
└── styles/       # グローバルなスタイル
```

詳細なアーキテクチャや開発の指針については、`docs/architecture.md`を参照してください。
