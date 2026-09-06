import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PageNavNum from "./pageNavNum";

const meta = {
  component: PageNavNum,
} satisfies Meta<typeof PageNavNum>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const Middle: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

export const Last: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

export const Few: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
  },
};
