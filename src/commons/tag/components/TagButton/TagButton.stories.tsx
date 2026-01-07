import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TagButton from "./TagButton";
import { kMaxLength } from "buffer";

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

const MultiArgs = {
  category: [
    {
      id: "id1",
      name: "これはテストです",
    },
    {
      id: "id2",
      name: "これはテストですこれはテストです",
    },
    {
      id: "id3",
      name: "これはテストですこれはテストですこれはテストです",
    },
  ],
};

const MultiLimitArgs = {
  category: [
    {
      id: "id1",
      name: "これはテストです",
    },
    {
      id: "id2",
      name: "これはテストですこれはテストです",
    },
    {
      id: "id3",
      name: "これはテストですこれはテストですこれはテストです",
    },
  ],
  maxLength: 5,
};

export const Default: Story = {
  args: defaultArgs,
};

export const MultiTags: Story = {
  args: MultiArgs,
};

export const MultiLimitTags: Story = {
  args: MultiLimitArgs,
};
