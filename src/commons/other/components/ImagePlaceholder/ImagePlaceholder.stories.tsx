import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ImagePlaceholder from "./ImagePlaceholder";

const meta = {
  component: ImagePlaceholder,
} satisfies Meta<typeof ImagePlaceholder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomLabel: Story = {
  args: {
    label: "MONELOGUE",
  },
};
