import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TimelineMarker from "./TimelineMarker";

const meta = {
  component: TimelineMarker,
} satisfies Meta<typeof TimelineMarker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    year: "2020",
    title: "Clip Studio Paint",
  },
};

export const Large: Story = {
  args: {
    year: "2024",
    title: "Next.js / TypeScript",
    size: "lg",
  },
};

export const Hollow: Story = {
  args: {
    year: "2025.09",
    hollow: true,
  },
};
