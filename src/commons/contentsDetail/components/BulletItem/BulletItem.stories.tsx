import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BulletItem from "./BulletItem";

const meta = {
  component: BulletItem,
} satisfies Meta<typeof BulletItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Server Componentsをデフォルトで使う",
  },
};
