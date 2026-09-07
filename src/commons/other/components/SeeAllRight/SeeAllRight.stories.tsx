import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SeeAllRight from "./SeeAllRight";

const meta = {
  component: SeeAllRight,
} satisfies Meta<typeof SeeAllRight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "/articles",
  },
};

export const WithTag: Story = {
  args: {
    href: "/tags/nextjs",
    tag: {
      name: "Next.js",
      count: 12,
    },
  },
};

// 残り件数が 0 以下のときはバッジを描画しない
export const WithTagNoRemainder: Story = {
  args: {
    href: "/tags/nextjs",
    tag: {
      name: "Next.js",
      count: 0,
    },
  },
};
