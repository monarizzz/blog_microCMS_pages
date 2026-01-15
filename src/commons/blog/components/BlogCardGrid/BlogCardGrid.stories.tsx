import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BlogCardGrid from "./BlogCardGrid";
import { CategoryList } from "@/libs/schema/Category/category";
import { BlogWithPlainText } from "@/features/blog/types/blogWithPlainText";

const meta: Meta<typeof BlogCardGrid> = {
  component: BlogCardGrid,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof BlogCardGrid>;

/* --- 定義されている全てのタグを定義 （ダミー）*/
const mockCategoryList: CategoryList = [
  { id: "id1", name: "タグ1" },
  { id: "id2", name: "タグ2" },
  { id: "id3", name: "タグ3" },
];

const defaultArgs = {
  blogWithPlainTextList: [
    {
      id: "sample-blog2",
      publishedAt: "2025-09-15T10:00:00.000Z",
      categories: [
        {
          id: "id1",
          name: "一ニ三四五六七",
        },
        { id: "id2", name: "一ニ三四五六七" },
        { id: "id3", name: "12345678" },
      ],
      title:
        "サンプル記事のタイトルサンプル記事のタイトルサンプル記事のタイトルサンプル記事のタイトルサンプル記事のタイトルサンプル記事のタイトル",
      plainTextBody:
        "これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。これはサンプル記事の本文です。",
    } satisfies BlogWithPlainText,
  ],
  category: mockCategoryList,
};

// --- ストーリー定義 ---
export const Default: Story = {
  render: () => (
    <div style={{ display: "flex" }}>
      <BlogCardGrid {...defaultArgs} />
      <BlogCardGrid {...defaultArgs} />
      <BlogCardGrid {...defaultArgs} />
      <BlogCardGrid {...defaultArgs} />
      <BlogCardGrid {...defaultArgs} />
      <BlogCardGrid {...defaultArgs} />
    </div>
  ),
};
