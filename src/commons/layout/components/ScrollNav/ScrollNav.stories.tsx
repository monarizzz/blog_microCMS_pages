import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ScrollNav from "./ScrollNav";

const meta = {
  component: ScrollNav,
} satisfies Meta<typeof ScrollNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
