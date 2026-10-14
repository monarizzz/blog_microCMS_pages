import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BackLink from "./BackLink";

const meta = {
  component: BackLink,
} satisfies Meta<typeof BackLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Tags へ",
    link: "/tags",
  },
};

export const Service: Story = {
  args: {
    text: "Service へ戻る",
    link: "/service",
  },
};
