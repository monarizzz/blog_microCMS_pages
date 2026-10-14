import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Paragraph from "@/commons/contentsDetail/components/Paragraph/Paragraph";

import ArticleInlineText from "./ArticleInlineText";

const meta = {
  component: ArticleInlineText,
  // 呼び出し側では Paragraph などの中に置くので、同じ文脈で見る
  decorators: [
    (Story) => (
      <div className="w-216">
        <Paragraph>
          <Story />
        </Paragraph>
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleInlineText>;

export default meta;

type Story = StoryObj<typeof meta>;

/** pen の Blocks Catalog `InlineRow` (Hveyn) に並ぶ装飾 */
export const Marks: Story = {
  args: {
    inlines: [
      { text: "太字", marks: ["bold"] },
      { text: " / " },
      { text: "斜体", marks: ["italic"] },
      { text: " / " },
      { text: "取り消し線", marks: ["strike"] },
      { text: " / " },
      { text: "下線", marks: ["underline"] },
      { text: " / " },
      { text: "リンク", href: "https://example.com" },
      { text: " / " },
      { text: "inline code", marks: ["code"] },
    ],
  },
};

export const Combined: Story = {
  args: {
    inlines: [
      { text: "設定は " },
      { text: ".git/config", marks: ["code", "bold"] },
      { text: " にあり、詳しくは" },
      { text: "公式ドキュメント", marks: ["bold"], href: "/article" },
      { text: "を参照。" },
    ],
  },
};

export const LineBreak: Story = {
  args: {
    inlines: [{ text: "1 行目\n2 行目\n3 行目" }],
  },
};
