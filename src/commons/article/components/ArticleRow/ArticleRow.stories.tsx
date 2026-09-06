import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticleRow from "./ArticleRow";

const meta = {
  component: ArticleRow,
} satisfies Meta<typeof ArticleRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Compact: Story = {
  args: {
    compact: true,
  },
};
