import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Quote from "./Quote";

const meta = {
  component: Quote,
} satisfies Meta<typeof Quote>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "シンプルさは究極の洗練である。",
    cite: "— レオナルド・ダ・ヴィンチ",
  },
};

export const WithoutCite: Story = {
  args: {
    children: "引用元を伴わないシンプルな引用ブロック。",
  },
};
