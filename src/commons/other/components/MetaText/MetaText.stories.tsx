import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import MetaText from "./MetaText";

const meta = {
  component: MetaText,
} satisfies Meta<typeof MetaText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "2024.03.18",
  },
};

export const Range: Story = {
  args: {
    children: "1–15 / 38",
  },
};
