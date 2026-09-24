import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ProfilePageMain from "./ProfilePageMain";

const meta = {
  component: ProfilePageMain,
} satisfies Meta<typeof ProfilePageMain>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
