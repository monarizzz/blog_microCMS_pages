import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ServiceCard from "./ServiceCard";

const meta = {
  component: ServiceCard,
} satisfies Meta<typeof ServiceCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "天気予報アプリ",
    techStack: "Next.js / TypeScript / microCMS",
  },
};

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
    thumbnailUrl: "https://placehold.jp/440x180.png",
    url: "https://example.com",
  },
};
