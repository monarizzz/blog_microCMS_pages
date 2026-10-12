import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ContentsRow from "./ContentsRow";

const meta = {
  component: ContentsRow,
  args: {
    title: "Next.js 14 App Router 移行の勘所",
    summary:
      "PagesRouterからの移行を検討しているプロジェクトも多いことでしょう。最大のパラダイムシフトは、ReactServerComponentsをデフォルトとする設計思想にあります。",
    publishedAt: "2024-03-18",
    tags: ["タグ", "Next.js"],
    href: "/article/nextjs-app-router",
  },
} satisfies Meta<typeof ContentsRow>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 記事一覧・Tags のセクション内で使う通常表示 */
export const Default: Story = {
  args: {},
};

/** 抜粋を落として 1 行に収める表示 */
export const Compact: Story = {
  args: {
    compact: true,
  },
};

/** セクション見出し (h2) の下に置く場合。タイトルを h3 にする */
export const HeadingLevel3: Story = {
  args: {
    headingLevel: 3,
  },
};

/** タグが 1 件も無い記事 */
export const NoTags: Story = {
  args: {
    tags: [],
  },
};
