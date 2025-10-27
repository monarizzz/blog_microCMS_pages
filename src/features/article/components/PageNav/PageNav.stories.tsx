import type { Meta, StoryObj } from "@storybook/react-vite";
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
    articleNavigation: {
      prevArticle: { id: "sample-blog", title: "サンプル記事のタイトル" },
      nextArticle: { id: "sample-blog", title: "サンプル記事のタイトル" },
    },
  },
};

export const OnlyNext: Story = {
  args: {
    articleNavigation: {
      prevArticle: null,
      nextArticle: { id: "sample-blog", title: "サンプル記事のタイトル" },
    },
  },
};

export const OnlyPrev: Story = {
  args: {
    articleNavigation: {
      prevArticle: { id: "sample-blog", title: "サンプル記事のタイトル" },
      nextArticle: null,
    },
  },
};
