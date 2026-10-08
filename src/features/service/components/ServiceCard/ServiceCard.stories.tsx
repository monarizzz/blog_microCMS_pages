import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockService, mockTag } from "../../mocks/services";
import ServiceCard from "./ServiceCard";

const meta = {
  component: ServiceCard,
} satisfies Meta<typeof ServiceCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    service: mockService("weather-app"),
  },
};

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
