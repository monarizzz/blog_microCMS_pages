import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import GlobalNav from "./GlobalNav";
import { pageList } from "../../constants/pageList";

const meta = {
  component: GlobalNav,
} satisfies Meta<typeof GlobalNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pageList: pageList,
  },
};
