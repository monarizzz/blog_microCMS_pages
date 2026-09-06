import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import InfoLabel from "./InfoLabel";

const meta = {
  component: InfoLabel,
} satisfies Meta<typeof InfoLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "LABEL",
  },
};

export const Period: Story = {
  args: {
    children: "PERIOD",
  },
};
