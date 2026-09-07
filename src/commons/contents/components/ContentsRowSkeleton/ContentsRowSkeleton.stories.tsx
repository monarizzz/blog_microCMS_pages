import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ContentsRowSkeleton from "./ContentsRowSkeleton";

const meta = {
  component: ContentsRowSkeleton,
} satisfies Meta<typeof ContentsRowSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const List: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col">
      {Array.from({ length: 4 }, (_, i) => (
        <ContentsRowSkeleton key={i} />
      ))}
    </div>
  ),
};
