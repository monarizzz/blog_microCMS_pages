import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TagBtn from "./TagBtn";

const meta = {
  component: TagBtn,
} satisfies Meta<typeof TagBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Next.js",
    link: "/tags/nextjs",
  },
};
