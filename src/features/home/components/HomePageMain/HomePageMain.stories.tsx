import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockShelfArticles, mockShelfServices } from "../../mocks/shelf";
import { toArticleShelf, toServiceShelf } from "../../toShelfItems";
import HomePageMain from "./HomePageMain";

const meta = {
  component: HomePageMain,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HomePageMain>;

export default meta;

type Story = StoryObj<typeof meta>;

/** pen `hdLAj` と同じ冊数（記事 5・制作物 4）を並べた状態 */
export const Default: Story = {
  args: {
    blogShelf: toArticleShelf(mockShelfArticles),
    serviceShelf: toServiceShelf(mockShelfServices),
  },
};

/** 冊数が pen より多く、本の見た目が周期で繰り返される状態 */
export const ManyBooks: Story = {
  args: {
    blogShelf: toArticleShelf([...mockShelfArticles, ...mockShelfArticles]),
    serviceShelf: toServiceShelf([...mockShelfServices, ...mockShelfServices]),
  },
};

/** 冊数が少なく、手前に来る本の無いメモが置かれない状態 */
export const FewBooks: Story = {
  args: {
    blogShelf: toArticleShelf(mockShelfArticles.slice(0, 1)),
    serviceShelf: toServiceShelf(mockShelfServices.slice(0, 2)),
  },
};

/**
 * 記事が無い（articles API が未作成で取得できない場合を含む）状態。
 * Blog の段と「記事をすべて見る」を出さない
 */
export const WithoutArticles: Story = {
  args: {
    blogShelf: [],
    serviceShelf: toServiceShelf(mockShelfServices),
  },
};
