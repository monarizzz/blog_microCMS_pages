import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticlePage, { type ArticleListItem } from "./articlePage";

const sampleArticles: ArticleListItem[] = [
  {
    id: "nextjs-app-router",
    title: "Next.js 14 App Router 移行の勘所",
    publishedAt: "2024-03-18T03:00:00.000Z",
    tags: ["Next.js", "設計"],
  },
  {
    id: "server-components-boundary",
    title: "Server Components の境界をどこに引くか",
    publishedAt: "2024-02-06T03:00:00.000Z",
    tags: ["Next.js", "設計"],
  },
  {
    id: "typescript-using",
    title: "TypeScript 5.2 の using 宣言によるリソース管理",
    publishedAt: "2024-01-22T03:00:00.000Z",
    tags: ["TypeScript"],
  },
  {
    id: "tailwind-v4",
    title: "Tailwind CSS v4 への期待と課題",
    publishedAt: "2023-12-11T03:00:00.000Z",
    tags: ["設計"],
  },
  {
    id: "testing-library-pitfalls",
    title: "Testing Library で壊れにくいテストを書く",
    publishedAt: "2023-11-24T03:00:00.000Z",
    tags: ["テスト", "TypeScript"],
  },
];

/** 1 ページ分 (15 件) を、サンプルを使い回して id だけ変えて作る */
const pageOf = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const article = sampleArticles[i % sampleArticles.length];
    return { ...article, id: `${article.id}-${i}` };
  });

const meta = {
  component: ArticlePage,
  args: {
    articles: pageOf(15),
    totalCount: 38,
    currentPage: 1,
    sort: "new",
  },
} satisfies Meta<typeof ArticlePage>;

export default meta;

type Story = StoryObj<typeof meta>;

/** ?tag= 無し。全記事の一覧で、戻りリンクを出さない */
export const Default: Story = {};

/** ?tag= 付き。pen (nwTBC) の状態 */
export const Tagged: Story = {
  args: {
    tag: "Next.js",
  },
};

export const SortOld: Story = {
  args: {
    tag: "Next.js",
    sort: "old",
  },
};

/** 最終ページ。端数（38 - 30 = 8 件）だけ行が出る */
export const LastPage: Story = {
  args: {
    articles: pageOf(8),
    currentPage: 3,
  },
};

/** 記事が 1 件も無い */
export const Empty: Story = {
  args: {
    articles: [],
    totalCount: 0,
  },
};
