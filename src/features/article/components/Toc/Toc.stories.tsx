import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Toc from "./Toc";
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
    { styles: "h1", text: "見出し1", id: "id1" },
    { styles: "h2", text: "見出し2", id: "id2" },
    { styles: "h3", text: "見出し3", id: "id3" },
    {
      styles: "h2",
      text: "テストテストテストテストテストテストテストテストテストテストテストテストテストテストテストテスト",
      id: "id2",
    },
  ],
};

export const Default: Story = {
  args: defaultArgs,
};
