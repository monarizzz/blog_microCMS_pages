import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ServicePage from "./ServicePage";

const meta = {
  component: ServicePage,
} satisfies Meta<typeof ServicePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
