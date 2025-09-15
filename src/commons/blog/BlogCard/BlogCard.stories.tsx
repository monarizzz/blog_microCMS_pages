import type { Meta, StoryObj } from "@storybook/react";
import BlogCard from "./BlogCard";
import { BlogWithPlainText } from "@/infra/microCMS/schema/Blog/blogWithPlainText";
import { CategoryList } from "@/infra/microCMS/schema/Category/category";

const meta: Meta<typeof BlogCard> = {
  title: "Components/BlogCard",
  component: BlogCard,
};
export default meta;

type Story = StoryObj<typeof BlogCard>;

// --- ダミーデータ ---
const mockBlog = {
  id: "sample-blog",
  title: "サンプル記事のタイトル",
  publishedAt: "2025-09-15T10:00:00.000Z",
  plainTextBody: "これはサンプル記事の本文です。",
  categories: [{ id: "cat1", name: "技術" }],
} satisfies BlogWithPlainText;

const mockCategories: CategoryList = [
  { id: "cat1", name: "技術" },
  { id: "cat2", name: "日常" },
];

const defaultArgs = {
  blogsWithPlainText: mockBlog,
  category: mockCategories,
};

// --- ストーリー定義 ---
export const Default: Story = {
  args: defaultArgs,
};

export const MultipleTags: Story = {
  args: {
    blogsWithPlainText: {
      ...mockBlog,
      categories: [
        { id: "cat1", name: "技術" },
        { id: "cat2", name: "日常" },
      ],
    },
    category: mockCategories,
  },
};
