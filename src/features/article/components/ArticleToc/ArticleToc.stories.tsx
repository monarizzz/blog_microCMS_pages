import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticleToc from "./ArticleToc";

const meta = {
  component: ArticleToc,
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleToc>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: "server-components", text: "Server Componentsの基本原則" },
      { id: "boundary", text: "境界（Boundary）の設計" },
      { id: "summary", text: "まとめ" },
    ],
  },
};

export const LongText: Story = {
  args: {
    items: [
      {
        id: "long",
        text: "Server Components をデフォルトにしたときのデータフェッチとキャッシュの考え方",
      },
      { id: "summary", text: "まとめ" },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
