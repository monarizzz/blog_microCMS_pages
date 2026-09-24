import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PostNavLink from "./PostNavLink";

const meta = {
  component: PostNavLink,
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PostNavLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: "prev",
    title: "TypeScript 5.2のusing宣言によるリソース管理",
    href: "/article/typescript-using",
  },
};

export const Next: Story = {
  args: {
    direction: "next",
    title: "Tailwind CSS v4への期待と課題",
    href: "/article/tailwind-v4",
  },
};

export const LongTitle: Story = {
  args: {
    direction: "next",
    title:
      "Server Components をデフォルトにしたときのデータフェッチとキャッシュの考え方",
    href: "/article/server-components",
  },
};
