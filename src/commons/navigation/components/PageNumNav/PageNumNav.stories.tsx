import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import PageNavNum from "./PageNumNav";

const meta = {
  component: PageNavNum,
} satisfies Meta<typeof PageNavNum>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const Middle: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

export const Last: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

export const Few: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
  },
};

/** sort などのクエリを引き継ぐケース（例: /article?sort=old&page=3） */
export const WithQuery: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    basePath: "/article",
    query: { sort: "old" },
  },
};
