import type { Meta, StoryObj } from "@storybook/react";
import TableOfContent from "./TableOfContent";

const meta = {
  component: TableOfContent,
} satisfies Meta<typeof TableOfContent>;

export default meta;

type Story = StoryObj<typeof TableOfContent>;

const defaultArgs = {
  toc: [
    { text: "見出し1", id: "id1" },
    { text: "見出し2", id: "id2" },
  ],
};

export const Default: Story = {
  args: defaultArgs,
};
