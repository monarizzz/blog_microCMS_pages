import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ServiceCard from "./ServiceCard";

const meta = {
  component: ServiceCard,
} satisfies Meta<typeof ServiceCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// detailPath なし。カード全体がリンクにならず、
// hover / focus の見た目も出ないことを確認するケース
export const Default: Story = {
  args: {
    title: "天気予報アプリ",
    techStack: "Next.js / TypeScript / microCMS",
    developmentType: "Solo development",
  },
};

// detailPath なし・外部リンクあり。外部リンクだけが押せる状態で、
// カードの余白がクリックできないままであることを確認するケース
export const WithLinks: Story = {
  args: {
    title: "ECサイト",
    techStack: "Next.js / TypeScript / microCMS",
    developmentType: "Team development",
    url: "https://example.com",
    githubUrl: "https://github.com/example/example",
  },
};

export const WithThumbnail: Story = {
  args: {
    title: "ポートフォリオサイト",
    techStack: "Next.js / TypeScript / Tailwind CSS",
    developmentType: "Solo development",
    // next/image は remotePatterns 未登録のホストを弾くため、
    // ストーリーでは public 配下の画像を使う
    thumbnailUrl: "/github-mark.svg",
    url: "https://example.com",
  },
};

// detailPath あり・外部リンクあり。カード全面がクリックでき、かつ
// URL / GitHub が飲まれずに個別に押せることを確認するケース
export const WithDetailPage: Story = {
  args: {
    title: "MoneLogue",
    techStack: "Next.js / TypeScript / microCMS",
    developmentType: "Solo development",
    url: "https://example.com",
    githubUrl: "https://github.com/example/monelogue",
    detailPath: "/service/monelogue",
  },
};

// detailPath あり・外部リンクなし。カード全面のリンクだけがある状態
export const WithDetailPageOnly: Story = {
  args: {
    title: "MoneLogue",
    techStack: "Next.js / TypeScript / microCMS",
    developmentType: "Solo development",
    detailPath: "/service/monelogue",
  },
};
