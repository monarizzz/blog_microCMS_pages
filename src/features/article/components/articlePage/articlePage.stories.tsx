import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticlePage from "./articlePage";

const meta = {
  component: ArticlePage,
} satisfies Meta<typeof ArticlePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SortOld: Story = {
  args: {
    sort: "old",
  },
};

export const SecondPage: Story = {
  args: {
    currentPage: 2,
  },
};

/** 最終ページ。端数（38 - 30 = 8 件）だけ行が出る */
export const LastPage: Story = {
  args: {
    currentPage: 3,
  },
};

/** 範囲外のページ番号。最終ページにクランプされる */
export const OutOfRangePage: Story = {
  args: {
    currentPage: 999,
  },
};
