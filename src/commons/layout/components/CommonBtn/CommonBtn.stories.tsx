import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CommonBtn from "./CommonBtn";

const meta = {
  component: CommonBtn,
} satisfies Meta<typeof CommonBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Next.js",
    link: "/tags/nextjs",
  },
};
