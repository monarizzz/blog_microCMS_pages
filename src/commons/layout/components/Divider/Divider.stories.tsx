import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Divider from "./Divider";

const meta = {
  component: Divider,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

// Divider 自体は 1px の細線なので、単体で置くと見落としやすい。
// 前後にダミーのコンテンツを挟んで、区切りとして機能していることを見せる。
export const Horizontal: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <p className="py-3 text-sm text-on-surface">上のコンテンツ</p>
        <Story />
        <p className="py-3 text-sm text-on-surface">下のコンテンツ</p>
      </div>
    ),
  ],
};

// vertical は h-full なので、親に高さが無いと 0px になり描画されない。
// flex の行に置いて高さを与えた状態で確認する。
export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  decorators: [
    (Story) => (
      <div className="flex h-8 items-center gap-4">
        <span className="text-sm text-on-surface">左のコンテンツ</span>
        <Story />
        <span className="text-sm text-on-surface">右のコンテンツ</span>
      </div>
    ),
  ],
};

// 線色 (outline-variant) は淡いため、背景とのコントラストを確認できるよう
// surface / surface-container の両方に重ねて並べる。
export const OnBackgrounds: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="bg-surface p-4">
          <p className="pb-3 text-sm text-on-surface">bg-surface</p>
          <Story />
        </div>
        <div className="bg-surface-container p-4">
          <p className="pb-3 text-sm text-on-surface">bg-surface-container</p>
          <Story />
        </div>
      </div>
    ),
  ],
};
