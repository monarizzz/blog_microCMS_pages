import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ServiceCardRow from "./ServiceCardRow";

const meta = {
  component: ServiceCardRow,
} satisfies Meta<typeof ServiceCardRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    left: {
      title: "天気予報アプリ",
      role: "Solo development",
      stack: "Next.js / TypeScript / microCMS",
      url: "https://example.com",
      github: "https://github.com/example/example",
    },
    right: {
      title: "ECサイト",
      role: "Team development",
      stack: "Next.js / TypeScript / microCMS",
      url: "https://example.com",
    },
  },
};
