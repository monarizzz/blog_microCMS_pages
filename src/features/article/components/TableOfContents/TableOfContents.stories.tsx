import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Toc from "./TableOfContents";
const meta = {
  component: Toc,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Toc>;

export default meta;

type Story = StoryObj<typeof Toc>;

const defaultArgs = {
  toc: [
    { text: "見出し1", id: "id1" },
    { text: "見出し2", id: "id2" },
    {
      text: "テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテスト",
      id: "id2",
    },
  ],
};

export const Default: Story = {
  args: defaultArgs,
};
