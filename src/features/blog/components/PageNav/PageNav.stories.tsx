import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PageNav from "./PageNav";

const meta = {
  component: PageNav,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PageNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blogNavigation: {
      prevBlog: { id: "sample-blog", title: "サンプル記事のタイトル" },
      nextBlog: { id: "sample-blog", title: "サンプル記事のタイトル" },
    },
  },
};

export const OnlyNext: Story = {
  args: {
    blogNavigation: {
      prevBlog: null,
      nextBlog: { id: "sample-blog", title: "サンプル記事のタイトル" },
    },
  },
};

export const OnlyPrev: Story = {
  args: {
    blogNavigation: {
      prevBlog: { id: "sample-blog", title: "サンプル記事のタイトル" },
      nextBlog: null,
    },
  },
};
