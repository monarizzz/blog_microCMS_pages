import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticleH3 from "./ArticleH3";

const meta = {
  component: ArticleH3,
} satisfies Meta<typeof ArticleH3>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "見出し3 / Heading 3",
  },
};
