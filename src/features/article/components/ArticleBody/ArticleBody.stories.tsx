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
        content: [
          {
            text: "Next.js 13から導入され、14でさらに洗練されたApp Router。Pages Routerからの移行を検討しているプロジェクトも多いことでしょう。",
          },
        ],
      },
      {
        type: "heading2",
        id: "server-components",
        text: "Server Componentsの基本原則",
      },
      {
        type: "bulletList",
        items: [
          { content: [{ text: "データベースへの直接アクセスが可能" }] },
          { content: [{ text: "機密情報（APIキーなど）を安全に扱える" }] },
          { content: [{ text: "大きな依存関係をクライアントに送らずに済む" }] },
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
        headers: [
          [{ text: "プロパティ" }],
          [{ text: "型" }],
          [{ text: "説明" }],
        ],
        rows: [
          [
            [{ text: "title" }],
            [{ text: "string" }],
            [{ text: "記事のタイトル" }],
          ],
          [
            [{ text: "publishedAt" }],
            [{ text: "string" }],
            [{ text: "公開日時 (ISO 8601)" }],
          ],
        ],
      },
      {
        type: "infoCard",
        content: [
          {
            text: "データフェッチは可能な限り親のServer Componentで行い、結果をpropsとしてClient Componentに渡す設計を心がけましょう。",
          },
        ],
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    blocks: [],
  },
};

/** 外部への通信を起こさないよう、画像は data URI の矩形で代用する */
const SAMPLE_IMAGE_SRC = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="280"><rect width="500" height="280" fill="#d9dde3"/></svg>',
)}`;

/** リッチエディタから変換されうる残りのブロック（小見出し・入れ子リスト・番号リスト・引用・画像・区切り線・見出し行の無い表） */
export const RichEditorBlocks: Story = {
  args: {
    blocks: [
      { type: "heading2", id: "h-background", text: "背景" },
      { type: "heading3", id: "h-overview", text: "インターン概要" },
      {
        type: "bulletList",
        items: [
          { content: [{ text: "企業：CARTA HOLDINGS" }] },
          {
            content: [{ text: "内容：講義＋チーム開発" }],
            children: [
              {
                type: "bulletList",
                items: [
                  { content: [{ text: "前半は講義" }] },
                  { content: [{ text: "後半はチーム開発" }] },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "numberedList",
        items: [
          { content: [{ text: "Node.js を入れる" }] },
          {
            content: [{ text: "正しく入ったか確認する" }],
            children: [
              {
                type: "code",
                language: "bash",
                code: "$ node -v\nv22.11.0",
              },
            ],
          },
        ],
      },
      {
        type: "code",
        language: "ini",
        filename: ".git/config",
        code: '[branch "dev"]\n      remote = origin\n      merge = refs/heads/main',
      },
      {
        type: "quote",
        content: [{ text: "1 行目の引用\n2 行目の引用" }],
      },
      {
        type: "image",
        src: SAMPLE_IMAGE_SRC,
        alt: "チームキックオフの様子",
        width: 500,
        height: 280,
        caption: "チームキックオフの様子",
      },
      { type: "divider" },
      {
        type: "table",
        headers: [],
        rows: [
          [[{ text: "home" }], [{ text: "文頭に飛ぶ" }], [{ text: "⌘ ←" }]],
          [[{ text: "end" }], [{ text: "文末に飛ぶ" }], [{ text: "⌘ →" }]],
        ],
      },
    ],
  },
};

/** 段落・リスト・表・InfoCard の中に装飾とリンクを含む */
export const WithInlineMarks: Story = {
  args: {
    blocks: [
      {
        type: "paragraph",
        content: [
          { text: "ブランチをリネームしても、" },
          { text: "追跡先", marks: ["bold"] },
          { text: "は " },
          { text: "origin/main", marks: ["code"] },
          { text: " のまま残る。詳しくは" },
          { text: "公式ドキュメント", href: "https://git-scm.com/docs" },
          { text: "を参照。" },
        ],
      },
      {
        type: "bulletList",
        items: [
          { content: [{ text: "git branch -vv", marks: ["code"] }] },
          {
            content: [
              { text: "古い手順", marks: ["strike"] },
              { text: " → 新しい手順" },
            ],
          },
        ],
      },
      {
        type: "table",
        headers: [[{ text: "観点", marks: ["bold"] }], [{ text: "結果" }]],
        rows: [[[{ text: "実装コスト" }], [{ text: "◎ 追加ライブラリ不要" }]]],
      },
      {
        type: "infoCard",
        content: [
          { text: "📣 注意", marks: ["bold", "underline"] },
          { text: "：\n2025-09-03 に仕様が変わった。" },
        ],
      },
    ],
  },
};
