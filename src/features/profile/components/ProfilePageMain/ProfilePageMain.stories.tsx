import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockProfile, mockTimeline } from "../../mocks/profile";
import ProfilePageMain from "./ProfilePageMain";

const meta = {
  component: ProfilePageMain,
} satisfies Meta<typeof ProfilePageMain>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profile: mockProfile,
    timeline: mockTimeline,
  },
};
