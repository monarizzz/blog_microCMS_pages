import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TagButton from "./TagButton";

const meta = {
  component: TagButton,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TagButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  category: [
    {
      id: "id1",
      name: "これはテストです",
    },
  ],
};

export const Default: Story = {
  args: defaultArgs,
};
