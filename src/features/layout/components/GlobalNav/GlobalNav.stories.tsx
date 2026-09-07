import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import GlobalNav from "./GlobalNav";

const meta = {
  component: GlobalNav,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof GlobalNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// 現在ページのリンクだけ選択状態になることを確認する
export const CurrentPage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/tags",
      },
    },
  },
};

// 下層ページでも親のリンクが選択状態のままになることを確認する
export const CurrentPageNested: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/tags/nextjs",
      },
    },
  },
};
