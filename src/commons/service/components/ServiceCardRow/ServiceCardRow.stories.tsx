import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ServiceCardRow from "./ServiceCardRow";

const meta = {
  component: ServiceCardRow,
} satisfies Meta<typeof ServiceCardRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    services: [
      {
        id: "weather-app",
        title: "天気予報アプリ",
        techStack: "Next.js / TypeScript / microCMS",
        url: "https://example.com",
        githubUrl: "https://github.com/example/weather-app",
      },
    ],
  },
};

export const Double: Story = {
  args: {
    services: [
      {
        id: "weather-app",
        title: "天気予報アプリ",
        techStack: "Next.js / TypeScript / microCMS",
        url: "https://example.com",
        githubUrl: "https://github.com/example/weather-app",
      },
      {
        id: "ec-site",
        title: "ECサイト",
        techStack: "Next.js / TypeScript / microCMS",
        developmentType: "Team development",
        url: "https://example.com",
      },
    ],
  },
};
