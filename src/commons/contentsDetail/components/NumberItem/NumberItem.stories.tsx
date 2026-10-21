import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import NumberItem from "./NumberItem";

const meta = {
  component: NumberItem,
} satisfies Meta<typeof NumberItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    number: 1,
    children: "依存関係をインストールする",
  },
};

export const SecondItem: Story = {
  args: {
    number: 2,
    children: "設定ファイルを編集する",
  },
};
