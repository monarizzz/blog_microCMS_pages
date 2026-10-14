import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PostNav from "./PostNav";

const prev = {
  id: "typescript-using",
  title: "TypeScript 5.2のusing宣言によるリソース管理",
};

const next = {
  id: "tailwind-v4",
  title: "Tailwind CSS v4への期待と課題",
};

const meta = {
  component: PostNav,
  decorators: [
    (Story) => (
      <div className="w-216">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PostNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { prev, next },
};

export const OnlyPrev: Story = {
  args: { prev },
};

export const OnlyNext: Story = {
  args: { next },
};
