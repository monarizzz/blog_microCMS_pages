import type { Meta, StoryObj } from "@storybook/react-vite";
import BlogCard from "./BlogCard";
import { BlogWithPlainText } from "@/libs/schema/Blog/blog";
import { CategoryList } from "@/libs/schema/Category/category";

const meta: Meta<typeof BlogCard> = {
  title: "Components/BlogCard",
  component: BlogCard,
};
export default meta;

type Story = StoryObj<typeof BlogCard>;

// --- ダミーデータ ---
const mockCategories: CategoryList = [
  { id: "id1", name: "タグ1" },
  { id: "id2", name: "タグ2" },
];

const mockBlog = {
  id: "sample-blog",
  publishedAt: "2025-09-15T10:00:00.000Z",
  categories: [{ id: "cat1", name: "技術" }],
  title: "サンプル記事のタイトル",
  plainTextBody: "これはサンプル記事の本文です。",
} satisfies BlogWithPlainText;

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
    blogWithPlainTextList: [mockBlog],
    category: mockCategories,
  },
};
