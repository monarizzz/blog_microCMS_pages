import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SearchIconButton from "./SearchIconButton";

const meta = {
  component: SearchIconButton,
} satisfies Meta<typeof SearchIconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    link: "/search",
  },
};

export const CustomLabel: Story = {
  args: {
    link: "/search",
    label: "記事を検索する",
  },
};
