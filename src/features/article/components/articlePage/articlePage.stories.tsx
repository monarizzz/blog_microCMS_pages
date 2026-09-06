import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticlePage from "./articlePage";

const meta = {
  component: ArticlePage,
} satisfies Meta<typeof ArticlePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const SortOld: Story = {
  args: {
    sort: "old",
  },
};

export const SecondPage: Story = {
  args: {
    currentPage: 2,
  },
};
