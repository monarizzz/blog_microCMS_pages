import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Logo from "./Logo";

const meta = {
  component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Header の使い方（pen: Logo bt1b6 / weight 300 + トップへのリンク） */
export const Default: Story = {
  args: {
    href: "/",
  },
};

/** Footer の使い方（pen: FooterLogo TUD2e / weight 500・リンクなし） */
export const Footer: Story = {
  args: {
    weight: "medium",
  },
};
