import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PostDate from "./PostDate";

const meta = {
  component: PostDate,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PostDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    blog: {
      id: "id1",
      createdAt: "2025-09-15T10:00:00.000Z",
      updatedAt: "2025-09-15T10:00:00.000Z",
      publishedAt: "2025-09-15T10:00:00.000Z",
      revisedAt: "2025-09-15T10:00:00.000Z",
      development_env: ["dev"],
      categories: [
        {
          id: "id1",
          name: "これはテストです",
        },
        {
          id: "id2",
          name: "これはテストです",
        },
      ],
      title: "string",
      body: "string",
    },
  },
};

export const update: Story = {
  args: {
    blog: {
      id: "id1",
      createdAt: "2025-09-15T10:00:00.000Z",
      updatedAt: "2025-09-15T10:00:00.000Z",
      publishedAt: "2025-09-15T10:00:00.000Z",
      revisedAt: "2025-09-25T20:10:00.000Z",
      development_env: ["dev"],
      categories: [
        {
          id: "id1",
          name: "これはテストです",
        },
        {
          id: "id2",
          name: "これはテストです",
        },
      ],
      title: "string",
      body: "string",
    },
  },
};
