import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Callout from "./Callout";

const meta = {
  component: Callout,
} satisfies Meta<typeof Callout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "ヒント",
    children:
      "補足情報や注意点をここに書きます。Notionのコールアウトと同じく、絵文字アイコンと本文で構成されます。",
  },
};

export const WithoutTitle: Story = {
  args: {
    children: "タイトルを伴わない、本文だけのコールアウト。",
  },
};

export const CustomEmoji: Story = {
  args: {
    emoji: "⚠️",
    title: "注意",
    children:
      "絵文字は emoji prop で差し替える。種類ごとの配色は ui.pen に定義が無いため、背景色は常に同じ。",
  },
};
