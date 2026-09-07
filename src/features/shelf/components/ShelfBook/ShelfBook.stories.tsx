import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ShelfBook from "./ShelfBook";

const meta = {
  component: ShelfBook,
} satisfies Meta<typeof ShelfBook>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Kosugiyu",
    meta: "2024 | Service",
    href: "/service/kosugiyu",
    coverText: "小杉湯",
    accent: "info",
    coverHeight: "lg",
    size: "lg",
  },
};

export const DarkCover: Story = {
  args: {
    title: "麻婆食堂 DONDON",
    meta: "2024 | Service",
    href: "/service/dondon",
    coverText: "どんどん",
    cover: "dark",
    coverTextSize: "sm",
    coverHeight: "sm",
    accent: "danger",
    size: "md",
  },
};

export const MutedCover: Story = {
  args: {
    title: "Portalley",
    meta: "2023 | Service",
    href: "/service/portalley",
    coverText: "Portalley",
    cover: "muted",
    coverTextSize: "sm",
    accent: "warning",
    size: "sm",
  },
};

export const InfoCover: Story = {
  args: {
    title: "型で守るコンポーネント設計",
    meta: "2024.02.06 · Blog",
    href: "/article/typed-components",
    coverText: "TS",
    cover: "info",
    coverTextSize: "lg",
    coverHeight: "sm",
    size: "md",
  },
};

// accent は success だけストーリーが無く、帯のコントラストが検査されていなかった
export const SuccessAccent: Story = {
  args: {
    title: "テストを書く習慣のつくりかた",
    meta: "2023.11.02 · Blog",
    href: "/article/testing-habit",
    coverText: "Test",
    cover: "muted",
    coverTextSize: "md",
    coverHeight: "sm",
    accent: "success",
    size: "md",
  },
};

// 詳細ページがまだ無い本。リンクにならず、見た目は Default と同じであること
export const WithoutHref: Story = {
  args: {
    title: "静的サイトという選択",
    meta: "2023.12.10 · Blog",
    coverText: "#",
    cover: "muted",
    coverTextSize: "lg",
    accent: "success",
    size: "sm",
  },
};

export const WithImage: Story = {
  args: {
    title: "Next.js 14 App Router 移行の勘所",
    meta: "2024.03.18 · Blog",
    href: "/article/app-router",
    // データ接続は別フェーズのため、public 配下の既存アセットで代用する
    coverImageUrl: "/home.svg",
    coverHeight: "lg",
    accent: "muted",
    size: "lg",
  },
};
