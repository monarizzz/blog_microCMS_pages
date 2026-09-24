import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Bookmark from "./Bookmark";

const meta = {
  component: Bookmark,
} satisfies Meta<typeof Bookmark>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "https://nextjs.org",
    title: "Next.js Documentation",
    description:
      "The React Framework for the Web. Used by some of the world's largest companies.",
    url: "nextjs.org",
  },
};

export const WithThumbnail: Story = {
  args: {
    href: "https://nextjs.org",
    title: "Next.js Documentation",
    description:
      "The React Framework for the Web. Used by some of the world's largest companies.",
    url: "nextjs.org",
    thumbnailUrl: "/github-mark.svg",
  },
};
