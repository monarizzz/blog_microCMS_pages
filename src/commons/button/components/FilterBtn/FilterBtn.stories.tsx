import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import FilterBtn from "./FilterBtn";

const meta = {
  component: FilterBtn,
} satisfies Meta<typeof FilterBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "古い順",
    link: "?sort=oldest",
  },
};

export const Active: Story = {
  args: {
    text: "新着順",
    link: "?sort=newest",
    active: true,
  },
};

export const MediumSolidActive: Story = {
  args: {
    text: "すべて",
    link: "/tags",
    active: true,
    size: "md",
    solid: true,
  },
};

export const Medium: Story = {
  args: {
    text: "#Next.js",
    link: "/tags/nextjs",
    size: "md",
  },
};
