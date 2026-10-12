import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockService, mockTag } from "../../mocks/services";
import ServiceCard from "./ServiceCard";

const meta = {
  component: ServiceCard,
} satisfies Meta<typeof ServiceCard>;

export default meta;

type Story = StoryObj<typeof meta>;

// hasDetailPage なし。カード全体がリンクにならず、
// hover / focus の見た目も出ないことを確認するケース
export const Default: Story = {
  args: {
    service: mockService("weather-app"),
  },
};

// hasDetailPage なし・外部リンクあり。外部リンクだけが押せる状態で、
// カードの余白がクリックできないままであることを確認するケース
export const WithLinks: Story = {
  args: {
    service: mockService("ec-site", {
      title: "ECサイト",
      kind: ["チーム開発"],
      url: [
        { fieldId: "url", url: "https://example.com" },
        { fieldId: "url", url: "https://github.com/example/example" },
      ],
    }),
  },
};

export const WithThumbnail: Story = {
  args: {
    service: mockService("portfolio", {
      title: "ポートフォリオサイト",
      tags: [
        mockTag("Next.js", ["フレームワーク"]),
        mockTag("TypeScript", ["言語"]),
        mockTag("Tailwind CSS", ["ライブラリ"]),
      ],
      // next/image は remotePatterns 未登録のホストを弾くため、
      // ストーリーでは public 配下の画像を使う
      heroImage: [{ url: "/github-mark.svg", width: 98, height: 96 }],
      url: [{ fieldId: "url", url: "https://example.com" }],
    }),
  },
};

// hasDetailPage あり・外部リンクあり。カード全面がクリックでき、かつ
// URL / GitHub が飲まれずに個別に押せることを確認するケース
export const WithDetailPage: Story = {
  args: {
    service: mockService("monelogue", {
      title: "MoneLogue",
      hasDetailPage: true,
      url: [
        { fieldId: "url", url: "https://example.com" },
        { fieldId: "url", url: "https://github.com/example/monelogue" },
      ],
    }),
  },
};

// hasDetailPage あり・外部リンクなし。カード全面のリンクだけがある状態
export const WithDetailPageOnly: Story = {
  args: {
    service: mockService("monelogue", {
      title: "MoneLogue",
      hasDetailPage: true,
    }),
  },
};
