import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PageNav from "./PageNav";

const meta = {
  component: PageNav,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PageNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blogNavigation: {
      backBlog: { id: "sample-blog", title: "サンプル記事のタイトル" },
      nextBlog: { id: "sample-blog", title: "サンプル記事のタイトル" },
    },
  },
};

export const OnlyNext: Story = {
  args: {
    blogNavigation: {
      backBlog: null,
      nextBlog: { id: "sample-blog", title: "サンプル記事のタイトル" },
    },
  },
};

export const OnlyPrev: Story = {
  args: {
    blogNavigation: {
      backBlog: { id: "sample-blog", title: "サンプル記事のタイトル" },
      nextBlog: null,
    },
  },
};

export const LongTitle: Story = {
  args: {
    blogNavigation: {
      backBlog: {
        id: "sample-blog",
        title:
          "これはとても長いタイトルの記事です。タイトルが一行を超えるとどのように表示されるかを確認するためのサンプルです。",
      },
      nextBlog: {
        id: "sample-blog",
        title:
          "これはとても長いタイトルの記事です。タイトルが一行を超えるとどのように表示されるかを確認するためのサンプルです。",
      },
    },
  },
};
