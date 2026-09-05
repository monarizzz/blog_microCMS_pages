import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CodeBlock from "./CodeBlock";

const meta = {
  component: CodeBlock,
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleCode = `export default async function Page() {
  const posts = await getPosts()
  return <PostList posts={posts} />
}`;

export const Default: Story = {
  args: {
    children: sampleCode,
    language: "app/page.tsx",
  },
};

export const WithoutLabel: Story = {
  args: {
    children: sampleCode,
  },
};
