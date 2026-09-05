import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ServiceCardRow from "./ServiceCardRow";

const meta = {
  component: ServiceCardRow,
} satisfies Meta<typeof ServiceCardRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    services: [
      {
        title: "天気予報アプリ",
        techStack: "Next.js / TypeScript / microCMS",
        url: "https://example.com",
        githubUrl: "https://github.com/example/weather-app",
      },
      {
        title: "ECサイト",
        techStack: "Next.js / TypeScript / microCMS",
        developmentType: "Team development",
        url: "https://example.com",
      },
    ],
  },
};
