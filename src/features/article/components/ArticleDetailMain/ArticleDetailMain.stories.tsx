import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticleDetailMain from "./ArticleDetailMain";

const meta = {
  component: ArticleDetailMain,
} satisfies Meta<typeof ArticleDetailMain>;

export default meta;

type Story = StoryObj<typeof meta>;

// 本文・タグ・日付・前後記事は ArticleDetailMain 内の仮置きデータ。
// 外から渡せるのは共有 URL に使う id だけなので、バリアントは 1 つ
export const Default: Story = {
  args: {
    id: "nextjs-app-router",
  },
};
