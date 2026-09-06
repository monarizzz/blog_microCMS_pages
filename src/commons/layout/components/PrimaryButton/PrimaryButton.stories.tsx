import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PrimaryButton from "./PrimaryButton";

const meta = {
  component: PrimaryButton,
} satisfies Meta<typeof PrimaryButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AsButton: Story = {
  args: {
    label: "ボタンラベル",
  },
};

export const AsLink: Story = {
  args: {
    label: "記事一覧へ",
    href: "/article",
  },
};
