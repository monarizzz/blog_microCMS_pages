import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Divider from "./Divider";

const meta = {
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "80px" }}>
        <Story />
      </div>
    ),
  ],
};
