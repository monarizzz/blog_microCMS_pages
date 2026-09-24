import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TagsPageMain from "./TagsPageMain";

const meta = {
  component: TagsPageMain,
} satisfies Meta<typeof TagsPageMain>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const TagSelected: Story = {
  args: {
    activeTag: "Next.js",
  },
};
