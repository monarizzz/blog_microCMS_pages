import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PageNavBtn from "./PageNavBtn";

const meta = {
  component: PageNavBtn,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PageNavBtn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Back: Story = {
  args: {
    content: { id: "sample-blog", title: "サンプル記事のタイトル" },
    isNext: false,
  },
};

export const Next: Story = {
  args: {
    content: { id: "sample-blog", title: "サンプル記事のタイトル" },
    isNext: true,
  },
};

export const NoContent: Story = {
  args: {
    content: null,
    isNext: false,
  },
};

export const LongTitle: Story = {
  args: {
    content: {
      id: "sample-blog",
      title:
        "これはとても長いタイトルの記事です。タイトルが一行を超えるとどのように表示されるかを確認するためのサンプルです。",
    },
    isNext: false,
  },
};
