import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ContentsRow from "./ContentsRow";

const meta = {
  component: ContentsRow,
} satisfies Meta<typeof ContentsRow>;

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
