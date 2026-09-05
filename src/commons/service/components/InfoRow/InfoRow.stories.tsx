import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import InfoRow from "./InfoRow";

const meta = {
  component: InfoRow,
} satisfies Meta<typeof InfoRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Period: Story = {
  args: {
    label: "PERIOD",
    value: "2024.01 - 2024.04",
  },
};

export const Role: Story = {
  args: {
    label: "ROLE",
    value: "設計 / 開発 / デザイン",
  },
};
