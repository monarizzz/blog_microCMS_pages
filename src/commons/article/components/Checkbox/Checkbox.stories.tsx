import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Checkbox from "./Checkbox";

const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    checked: true,
    children: "完了したタスク",
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
    children: "未完了のタスク",
  },
};
