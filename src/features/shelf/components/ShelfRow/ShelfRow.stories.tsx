import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ShelfBook from "../ShelfBook/ShelfBook";
import ShelfNote from "../ShelfNote/ShelfNote";
import ShelfRow from "./ShelfRow";

const meta = {
  component: ShelfRow,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ShelfRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Service の本棚",
    children: (
      <>
        <ShelfNote
          text="伝えるよりも、&#10;気づいてもらう"
          label="Attitude · 10"
          size="lg"
        />
        <ShelfBook
          title="小杉湯"
          meta="2024 | Service"
          href="/service/kosugiyu"
          coverText="小杉湯"
          accent="info"
          coverHeight="lg"
          size="lg"
        />
        <ShelfBook
          title="麻婆食堂 DONDON"
          meta="2024 | Service"
          href="/service/dondon"
          coverText="どんどん"
          cover="dark"
          coverTextSize="sm"
          coverHeight="sm"
          accent="danger"
          size="sm"
        />
      </>
    ),
  },
};

// 高さがまちまちな本でも下端が揃うこと（棚板に載って見えること）を見る
export const MixedHeights: Story = {
  args: {
    label: "Blog の本棚",
    children: (
      <>
        <ShelfBook
          title="型で守るコンポーネント設計"
          meta="2024.02.06 · Blog"
          href="/article/typed-components"
          coverText="TS"
          cover="info"
          coverTextSize="lg"
          coverHeight="sm"
          size="md"
        />
        <ShelfBook
          title="日本語タイポグラフィの基礎"
          meta="2023.11.04 · Blog"
          href="/article/japanese-typography"
          coverText="あ"
          coverTextSize="lg"
          coverHeight="lg"
          accent="danger"
          size="sm"
        />
        <ShelfNote text="意訳してみる" label="Attitude · 15" size="sm" />
      </>
    ),
  },
};

// 画面幅を超える冊数を入れて、横スクロールに落ちることを見る
export const Overflowing: Story = {
  args: {
    label: "Blog の本棚",
    children: Array.from({ length: 12 }, (_, index) => (
      <ShelfBook
        key={index}
        title={`記事タイトル ${index + 1}`}
        meta="2024.03.18 · Blog"
        href={`/article/${index + 1}`}
        coverText={`${index + 1}`}
        cover="muted"
        coverHeight={index % 2 === 0 ? "sm" : "lg"}
        accent="muted"
      />
    )),
  },
};
