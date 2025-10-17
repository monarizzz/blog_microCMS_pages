import type { Meta, StoryObj } from "@storybook/react-vite";
import Toc from "./Toc";
const meta = {
  component: Toc,
} satisfies Meta<typeof Toc>;

export default meta;

type Story = StoryObj<typeof Toc>;

const defaultArgs = {
  toc: [
    { text: "見出し1", id: "id1" },
    { text: "見出し2", id: "id2" },
  ],
};

export const Default: Story = {
  args: defaultArgs,
};
