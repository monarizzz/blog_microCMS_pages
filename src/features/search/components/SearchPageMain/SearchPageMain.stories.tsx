import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SearchPageMain from "./SearchPageMain";

const meta = {
  component: SearchPageMain,
  // SearchInput が useRouter を使うため、App Router のモックを有効にする
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof SearchPageMain>;

export default meta;

type Story = StoryObj<typeof meta>;

const articles = [
  {
    id: "nextjs-app-router",
    title: "Next.js 14 App Router 移行の勘所",
    summary:
      "PagesRouterからの移行を検討しているプロジェクトも多いことでしょう。最大のパラダイムシフトは、ReactServerComponentsをデフォルトとする設計思想にあります。",
    publishedAt: "2024-03-18",
    tags: ["Next.js", "設計"],
  },
  {
    id: "server-components-boundary",
    title: "Server Components の境界をどこに引くか",
    summary:
      "インタラクティブな要素が必要な箇所だけを Client Component に切り出すと、バンドルサイズと開発体験の両方を保てます。境界の引き方を整理します。",
    publishedAt: "2024-02-06",
    tags: ["Next.js", "設計"],
  },
];

export const Default: Story = {
  args: {
    query: "Next.js",
    articles,
  },
};

/** 一致した件数が取得の上限を超え、一部だけを並べている状態 */
export const Truncated: Story = {
  args: {
    query: "Next.js",
    articles,
    totalCount: 25,
  },
};

export const NoResult: Story = {
  args: {
    query: "該当なし",
    articles: [],
    suggestedTags: ["Next.js", "設計", "TypeScript", "テスト"],
  },
};

/** 提示できるタグが無い（記事が 1 件も無い / タグの取得に失敗した）状態 */
export const NoResultWithoutTags: Story = {
  args: {
    query: "該当なし",
    articles: [],
  },
};
