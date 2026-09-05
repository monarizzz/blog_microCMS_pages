import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Toggle from "./Toggle";

const meta = {
  component: Toggle,
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    summary: "詳細を表示する",
    children:
      "展開すると隠れていた本文が表示されます。折りたたみ可能なブロックとして補足情報の格納に便利です。",
  },
};

export const Open: Story = {
  args: {
    summary: "詳細を表示する",
    children:
      "展開すると隠れていた本文が表示されます。折りたたみ可能なブロックとして補足情報の格納に便利です。",
    defaultOpen: true,
  },
};
