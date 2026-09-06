import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ShareBar from "./ShareBar";

const meta = {
  component: ShareBar,
} satisfies Meta<typeof ShareBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: "https://example.com/articles/1",
    title: "記事タイトルのサンプル",
  },
};
