import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SectionLabel from "./SectionLabel";

const meta = {
  component: SectionLabel,
} satisfies Meta<typeof SectionLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "SECTION LABEL",
  },
};

export const Category: Story = {
  args: {
    children: "LAYOUT",
  },
};

export const ArticleBody: Story = {
  args: {
    children: "ARTICLE BODY",
  },
};
