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
    role: "Solo development",
    stack: "Next.js / TypeScript / microCMS",
    url: "https://example.com",
    github: "https://github.com/example/example",
  },
};

export const WithoutLinks: Story = {
  args: {
    title: "ECサイト",
    role: "Team development",
    stack: "Next.js / TypeScript / microCMS",
  },
};
