import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PageHeader from "./PageHeader";

const meta = {
  component: PageHeader,
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "ページタイトル",
  },
};

export const WithCount: Story = {
  args: {
    title: "Tags",
    count: "38 記事 / 4 カテゴリ",
  },
};

export const Full: Story = {
  args: {
    kicker: "KICKER",
    meta: "個人開発 · 2024 · フルスタック",
    title: "MoneLogue",
    sub: "収支を記録し、資産の推移をグラフで可視化する家計簿アプリ。",
    count: "6 プロジェクト",
  },
};

export const Compact: Story = {
  args: {
    title: "#Next.js",
    count: "38 記事",
    compact: true,
  },
};
