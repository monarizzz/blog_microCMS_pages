import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticleTocItem from "./ArticleTocItem";

const meta = {
  component: ArticleTocItem,
} satisfies Meta<typeof ArticleTocItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "境界（Boundary）の設計",
    href: "#boundary",
  },
};

export const Active: Story = {
  args: {
    text: "Server Componentsの基本原則",
    href: "#server-components",
    active: true,
  },
};

export const LongText: Story = {
  args: {
    text: "Server Components をデフォルトにしたときのデータフェッチとキャッシュの考え方",
    href: "#long",
  },
  decorators: [
    (Story) => (
      <div className="w-48">
        <Story />
      </div>
    ),
  ],
};
