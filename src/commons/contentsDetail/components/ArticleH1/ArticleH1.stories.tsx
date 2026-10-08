import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticleH1 from "./ArticleH1";

const meta = {
  component: ArticleH1,
} satisfies Meta<typeof ArticleH1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "見出し1 / Heading 1",
  },
};
