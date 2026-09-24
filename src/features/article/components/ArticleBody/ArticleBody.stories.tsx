import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ArticleBody from "./ArticleBody";

const meta = {
  component: ArticleBody,
  decorators: [
    (Story) => (
      <div className="w-216">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blocks: [
      {
        type: "paragraph",
        text: "Next.js 13から導入され、14でさらに洗練されたApp Router。Pages Routerからの移行を検討しているプロジェクトも多いことでしょう。",
      },
      {
        type: "heading2",
        id: "server-components",
        text: "Server Componentsの基本原則",
      },
      {
        type: "bulletList",
        items: [
          "データベースへの直接アクセスが可能",
          "機密情報（APIキーなど）を安全に扱える",
          "大きな依存関係をクライアントに送らずに済む",
        ],
      },
      {
        type: "code",
        language: "tsx",
        code: `export default async function Page() {
  const posts = await getPosts()
  return <PostList posts={posts} />
}`,
      },
      {
        type: "table",
        headers: ["プロパティ", "型", "説明"],
        rows: [
          ["title", "string", "記事のタイトル"],
          ["publishedAt", "string", "公開日時 (ISO 8601)"],
        ],
      },
      {
        type: "infoCard",
        text: "データフェッチは可能な限り親のServer Componentで行い、結果をpropsとしてClient Componentに渡す設計を心がけましょう。",
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    blocks: [],
  },
};
