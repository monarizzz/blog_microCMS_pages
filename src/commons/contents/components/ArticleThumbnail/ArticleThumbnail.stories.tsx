import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticleThumbnail from "./ArticleThumbnail";

const meta = {
  component: ArticleThumbnail,
} satisfies Meta<typeof ArticleThumbnail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoImage: Story = {};

export const WithImage: Story = {
  args: {
    src: "/home.svg",
    alt: "サンプル画像",
  },
};
