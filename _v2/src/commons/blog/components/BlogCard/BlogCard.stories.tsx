import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BlogCard from "./BlogCard";
import { BlogWithPlainText } from "@/features/blog/types/blogWithPlainText";

const meta: Meta<typeof BlogCard> = {
  component: BlogCard,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof BlogCard>;

const defaultArgs = {
  BlogWithPlainText: {
    id: "sample-blog",
    publishedAt: "2025-09-15T10:00:00.000Z",
    categories: [{ id: "id1", name: "タグ1" }],
    title:
      "サンプル記事のタイトルサンプル記事のタイトルサンプル記事のタイトルサンプル記事のタイトルサンプル記事のタイトル",
    plainTextBody:
      "これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。",
  } satisfies BlogWithPlainText,
};

// const args2 = {
//   BlogWithPlainText: {
//     id: "sample-blog2",
//     publishedAt: "2025-09-15T10:00:00.000Z",
//     categories: [
//       { id: "id1", name: "タグ1" },
//       { id: "id2", name: "タグ2" },
//       { id: "id3", name: "タグ3" },
//     ],
//     title:
//       "サンプル記事のタイトルサンプル記事のタイトルサンプル記事のタイトルサンプル記事のタイトルサンプル記事のタイトルサンプル記事のタイトル",
//     plainTextBody:
//       "これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。",
//   } satisfies BlogWithPlainText,
// };

// --- ストーリー定義 ---
export const Default: Story = {
  args: defaultArgs,
};

export const MultiTags: Story = {
  args: {
    BlogWithPlainText: {
      id: "sample-blog",
      publishedAt: "2025-09-15T10:00:00.000Z",
      categories: [
        { id: "id1", name: "タグ1タグ1" },
        { id: "id2", name: "タグ2タグ2" },
        // /TODO: 半角全角で最大の幅が変わる問題なおす
        { id: "id3", name: "123456789" },
      ],
      title: "サンプル記事のタイトル",
      plainTextBody: "これはサンプル記事の本文です。",
    } satisfies BlogWithPlainText,
  },
};
