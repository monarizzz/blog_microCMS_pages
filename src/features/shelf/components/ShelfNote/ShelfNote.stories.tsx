import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ShelfNote from "./ShelfNote";

const meta = {
  component: ShelfNote,
} satisfies Meta<typeof ShelfNote>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "伝えるよりも、\n気づいてもらう",
    label: "Attitude · 10",
  },
};

export const Small: Story = {
  args: {
    text: "意訳してみる",
    label: "Attitude · 15",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    text: "わかりあえないを、\nわかる",
    label: "Attitude · 18",
    size: "lg",
  },
};
