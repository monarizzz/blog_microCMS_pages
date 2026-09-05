import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CategorySectionHeader from "./CategorySectionHeader";

const meta = {
  component: CategorySectionHeader,
} satisfies Meta<typeof CategorySectionHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "設計",
    count: "11 記事",
  },
};

export const WithAnchor: Story = {
  args: {
    name: "Next.js",
    count: "12 記事",
    anchor: true,
  },
};
