import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ServiceDetailMain from "./ServiceDetailMain";

const meta = {
  component: ServiceDetailMain,
} satisfies Meta<typeof ServiceDetailMain>;

export default meta;

type Story = StoryObj<typeof meta>;

// ui.pen の ServiceDetailPage (qiFnK) に入っている文言をそのまま使う
export const Default: Story = {
  args: {
    shareUrl: "https://example.com/service/monelogue",
    service: {
      title: "MoneLogue",
      meta: "個人開発 · 2024 · フルスタック",
      description:
        "収支を記録し、資産の推移をグラフで可視化する家計簿アプリ。日々の入力から月次・年次の資産推移までを一元管理できます。",
      features: [
        "収支の記録とカテゴリ別の分類",
        "月次・年次レポートの自動生成",
        "資産推移のグラフ可視化",
        "データのCSVエクスポート",
      ],
      overview:
        "日々の収支入力から月次・年次の資産推移までを一元管理できる家計簿アプリです。microCMSをヘッドレスCMSとして採用し、カテゴリ管理を柔軟に行えるように設計しました。Rechartsによるグラフで資産の推移を直感的に把握できます。",
      techStack: [
        "Next.js",
        "TypeScript",
        "microCMS",
        "Tailwind CSS",
        "Recharts",
      ],
      period: "2024.01 - 2024.04",
      role: "設計 / 開発 / デザイン",
      links: [
        { href: "https://github.com/example/monelogue" },
        { href: "https://example.com" },
      ],
    },
  },
};

// 任意項目が全部欠けた最小構成。右カラムの区切り線が孤立しないことの確認
export const Minimal: Story = {
  args: {
    shareUrl: "https://example.com/service/minimal",
    service: {
      title: "名前だけのプロダクト",
    },
  },
};

export const GithubOnly: Story = {
  args: {
    shareUrl: "https://example.com/service/ec-site",
    service: {
      title: "ECサイト",
      meta: "チーム開発 · 2023 · フロントエンド",
      description: "Stripe 決済を組み込んだ EC サイト。",
      features: ["カート・決済フロー", "在庫連動の商品一覧"],
      overview:
        "チーム 4 名で開発した EC サイトのフロントエンドを担当しました。",
      techStack: ["Next.js", "TypeScript", "Stripe"],
      period: "2023.06 - 2023.10",
      periodNote: "約4ヶ月",
      role: "フロントエンド",
      links: [{ href: "https://github.com/example/ec-site" }],
    },
  },
};
