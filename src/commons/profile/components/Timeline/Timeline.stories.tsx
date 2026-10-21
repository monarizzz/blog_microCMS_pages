import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Timeline from "./Timeline";

const meta = {
  component: Timeline,
} satisfies Meta<typeof Timeline>;

export default meta;

type Story = StoryObj<typeof meta>;

const project = {
  category: "個人開発",
  description:
    "コラボレーション、スピード感、柔軟性、そしてイノベーティブな発想を、品質・コスト・スケジュール・スコープに意識を集中し、ストーリーのある活動的なビジュアルを表現します。",
  techStack: "Next.js / TypeScript / microCMS",
};

export const Default: Story = {
  args: {
    items: [
      { id: "clip-studio-paint", year: "2020", title: "Clip Studio Paint" },
      { id: "blender", year: "2021", title: "Blender" },
      { id: "live2d-cubism", year: "2022", title: "Live2D Cubism" },
      { id: "nextjs", year: "2024", title: "Next.js / TypeScript", size: "lg" },
      {
        id: "blog",
        year: "2025.09",
        project: { ...project, index: "01", title: "ブログサイト" },
      },
      {
        id: "teamlab",
        year: "2025.09",
        project: {
          ...project,
          index: "02",
          title: "チームラボ",
          category: "インターン",
          techStack: "Next.js / TypeScript / SCSS / StoryBook",
        },
      },
    ],
  },
};

export const MarkersOnly: Story = {
  args: {
    items: [
      { id: "clip-studio-paint", year: "2020", title: "Clip Studio Paint" },
      { id: "nextjs", year: "2024", title: "Next.js / TypeScript", size: "lg" },
    ],
  },
};
