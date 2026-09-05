import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ProjectItem from "./ProjectItem";

const meta = {
  component: ProjectItem,
} satisfies Meta<typeof ProjectItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: "01",
    title: "ブログサイト",
    category: "個人開発",
    description:
      "コラボレーション、スピード感、柔軟性、そしてイノベーティブな発想を、品質・コスト・スケジュール・スコープに意識を集中し、ストーリーのある活動的なビジュアルを表現します。",
    techStack: "Next.js / TypeScript / microCMS",
    link: "#",
  },
};

export const Internship: Story = {
  args: {
    index: "02",
    title: "チームラボ",
    category: "インターン",
    description:
      "コラボレーション、スピード感、柔軟性、そしてイノベーティブな発想を、品質・コスト・スケジュール・スコープに意識を集中し、ストーリーのある活動的なビジュアルを表現します。",
    techStack: "Next.js / TypeScript / SCSS / StoryBook",
    link: "#",
  },
};
