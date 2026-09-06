import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticleH2 from "./ArticleH2";

const meta = {
  component: ArticleH2,
} satisfies Meta<typeof ArticleH2>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "見出し2 / Heading 2",
  },
};
