import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Header from "./Header";

const meta = {
  component: Header,
  // GlobalNav が usePathname を使うため、App Router のモックを有効にする
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
