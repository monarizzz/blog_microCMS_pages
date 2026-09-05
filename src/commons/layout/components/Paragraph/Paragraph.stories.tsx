import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Paragraph from "./Paragraph";

const meta = {
  component: Paragraph,
} satisfies Meta<typeof Paragraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "本文テキストが入ります。",
  },
};
