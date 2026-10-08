import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticlePageSkeleton from "./articlePageSkeleton";

const meta = {
  component: ArticlePageSkeleton,
} satisfies Meta<typeof ArticlePageSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 1 ページぶん（perPage = 15 件） */
export const Default: Story = {
  args: {
    rowCount: 15,
  },
};

/** 最終ページ。端数（38 - 30 = 8 件）だけ行が出る */
export const LastPage: Story = {
  args: {
    rowCount: 8,
  },
};
