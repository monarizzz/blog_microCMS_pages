import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ServicePageMain from "./ServicePageMain";

const meta = {
  component: ServicePageMain,
} satisfies Meta<typeof ServicePageMain>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
