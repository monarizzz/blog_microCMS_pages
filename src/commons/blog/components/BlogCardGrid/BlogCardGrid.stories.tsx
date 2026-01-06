import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import BlogCard from "./BlogCardGrid";
import { BlogWithPlainText } from "@/libs/schema/Blog/blog";
import { CategoryList } from "@/libs/schema/Category/category";

const meta: Meta<typeof BlogCard> = {
  component: BlogCard,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof BlogCard>;

/* --- 定義されている全てのタグを定義 （ダミー）*/
const mockCategoryList: CategoryList = [
  { id: "id1", name: "タグ1" },
  { id: "id2", name: "タグ2" },
  { id: "id3", name: "タグ3" },
  { id: "id4", name: "タグ4" },
];

const defaultArgs = {
  blogWithPlainTextList: [
    {
      id: "sample-blog",
      publishedAt: "2025-09-15T10:00:00.000Z",
      categories: [{ id: "id1", name: "タグ1" }],
      title: "サンプル記事のタイトル",
      plainTextBody: "これはサンプル記事の本文です。",
    } satisfies BlogWithPlainText,
  ],
  category: mockCategoryList,
};

const args2 = {
  blogWithPlainTextList: [
    {
      id: "sample-blog2",
      publishedAt: "2025-09-15T10:00:00.000Z",
      categories: [
        { id: "id1", name: "タグ1" },
        { id: "id2", name: "タグ2" },
        { id: "id3", name: "タグ3" },
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
  args: defaultArgs,
};

export const MultiTags: Story = {
  args: {
    blogWithPlainTextList: [
      {
        id: "sample-blog",
        publishedAt: "2025-09-15T10:00:00.000Z",
        categories: [
          { id: "id1", name: "タグ1" },
          { id: "id2", name: "タグ2" },
          { id: "id3", name: "タグ3" },
          { id: "id4", name: "タグ4" },
        ],
        title: "サンプル記事のタイトル",
        plainTextBody: "これはサンプル記事の本文です。",
      } satisfies BlogWithPlainText,
    ],
  },
};

export const MultiCard = {
  render: () => (
    <div style={{ display: "flex" }}>
      <BlogCard {...defaultArgs} />
      <BlogCard {...args2} />
    </div>
  ),
};
