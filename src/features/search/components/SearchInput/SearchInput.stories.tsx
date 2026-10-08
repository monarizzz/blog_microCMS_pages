import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SearchInput from "./SearchInput";

const meta = {
  component: SearchInput,
  // useRouter を使うため、App Router のモックを有効にする
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithQuery: Story = {
  args: {
    query: "App Router",
  },
};
