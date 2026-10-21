import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ScrollTopButton from "./ScrollTopButton";

const meta = {
  component: ScrollTopButton,
  parameters: { layout: "centered" },
} satisfies Meta<typeof ScrollTopButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
