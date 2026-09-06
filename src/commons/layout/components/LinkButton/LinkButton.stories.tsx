import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import LinkButton from "./LinkButton";

const meta = {
  component: LinkButton,
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "https://example.com",
  },
};

export const CustomLabel: Story = {
  args: {
    href: "https://example.com",
    label: "GitHub へ",
  },
};
