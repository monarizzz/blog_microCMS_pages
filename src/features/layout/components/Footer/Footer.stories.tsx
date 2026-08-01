import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Footer from "./Footer";
import { pageList } from "../../constants/pageList";

const meta = {
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pageList: pageList,
  },
};
