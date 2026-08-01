import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Header from "./Header";
import { pageList } from "../../constants/pageList";

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pageList: pageList,
  },
};
