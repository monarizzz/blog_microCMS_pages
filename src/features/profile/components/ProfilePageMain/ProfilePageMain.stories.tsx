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

export const WithImage: Story = {
  args: {
    profile: {
      ...mockProfile,
      // next/image は remotePatterns 未登録のホストを弾き、Storybook から
      // microCMS の実画像にも依存したくないため、public 配下の画像を使う
      image: { url: "/github-mark.svg", width: 98, height: 96 },
    },
    timeline: mockTimeline,
  },
};
