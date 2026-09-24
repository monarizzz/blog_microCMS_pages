import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ShelfLabel from "./ShelfLabel";

const meta = {
  component: ShelfLabel,
} satisfies Meta<typeof ShelfLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Blog: Story = {
  args: {
    children: "Blog",
  },
};

export const Service: Story = {
  args: {
    children: "Service",
  },
};
