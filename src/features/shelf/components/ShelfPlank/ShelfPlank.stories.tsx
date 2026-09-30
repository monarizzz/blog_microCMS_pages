import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ShelfPlank from "./ShelfPlank";

const meta = {
  component: ShelfPlank,
} satisfies Meta<typeof ShelfPlank>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
