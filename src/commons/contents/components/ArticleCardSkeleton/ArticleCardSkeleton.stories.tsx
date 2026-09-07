import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticleCardSkeleton from "./ArticleCardSkeleton";

const meta = {
  component: ArticleCardSkeleton,
} satisfies Meta<typeof ArticleCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Grid: Story = {
  args: {},
  render: () => (
    <div className="flex gap-6">
      {Array.from({ length: 2 }, (_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  ),
};
