import type { Meta, StoryObj } from "@storybook/react-vite";
import CommonLayout from "./CommonLayout";

const meta = {
  component: CommonLayout,
} satisfies Meta<typeof CommonLayout>;

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
