import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Header from "./Header";

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
};

export const Login: Story = {
  args: { children: null },
};
export const Logout: Story = {
  args: { children: null },
};
