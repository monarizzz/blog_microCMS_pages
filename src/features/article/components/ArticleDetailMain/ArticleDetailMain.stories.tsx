import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  mockArticleDetail,
  mockPostNavigation,
} from "../../mocks/articleDetail";
import ArticleDetailMain from "./ArticleDetailMain";

const meta = {
  component: ArticleDetailMain,
  args: {
    article: mockArticleDetail,
    postNavigation: mockPostNavigation,
    shareUrl: "https://example.com/article/1h8zcejn2",
  },
} satisfies Meta<typeof ArticleDetailMain>;

export default meta;

type Story = StoryObj<typeof meta>;

/** リッチエディタの HTML を toArticleBlocks で変換した本文 */
export const Default: Story = {};

/** 最も古い記事。前の記事が無い */
export const Oldest: Story = {
  args: {
    postNavigation: { next: mockPostNavigation.next },
  },
};

/** 節の見出しが無い短い記事。目次とタグを出さない */
export const WithoutHeadings: Story = {
  args: {
    article: {
      ...mockArticleDetail,
      tags: [],
      blocks: mockArticleDetail.blocks.filter(
        (block) => block.type === "paragraph",
      ),
    },
    postNavigation: {},
  },
};
