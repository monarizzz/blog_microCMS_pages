import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Toggle from "./Toggle";

const meta = {
  component: Toggle,
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    summary: "詳細を表示する",
    children:
      "展開すると隠れていた本文が表示されます。折りたたみ可能なブロックとして補足情報の格納に便利です。",
  },
};

export const Open: Story = {
  args: {
    ...Default.args,
    defaultOpen: true,
  },
};

// summary が ReactNode を受け取れることを示すストーリー。
// リンクやボタンなどフォーカス可能な要素は <summary> の中に置けないため
// (nested-interactive / Enter キーでの開閉が壊れる)、装飾要素で示す。
export const WithRichSummary: Story = {
  args: {
    ...Default.args,
    summary: (
      <>
        <code>Toggle</code> を含む見出し
      </>
    ),
  },
};
