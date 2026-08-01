import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SearchPageMain from "./SearchPageMain";

const meta = {
  component: SearchPageMain,
} satisfies Meta<typeof SearchPageMain>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
