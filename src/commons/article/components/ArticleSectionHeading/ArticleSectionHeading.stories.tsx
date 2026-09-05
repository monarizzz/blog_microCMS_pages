import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticleSectionHeading from "./ArticleSectionHeading";

const meta = {
  component: ArticleSectionHeading,
} satisfies Meta<typeof ArticleSectionHeading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "セクション見出し",
  },
};
