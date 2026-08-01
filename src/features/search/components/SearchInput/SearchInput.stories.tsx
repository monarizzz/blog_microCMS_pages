import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SearchInput from "./SearchInput";

const meta = {
  component: SearchInput,
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
