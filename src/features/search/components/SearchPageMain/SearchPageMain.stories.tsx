import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SearchPageMain from "./SearchPageMain";

const meta = {
  component: SearchPageMain,
} satisfies Meta<typeof SearchPageMain>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    article: true,
    num: 2,
  },
};

export const NoResult: Story = {
  args: {
    article: false,
    num: 0,
  },
};
