import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import GithubBtn from "./GithubBtn";

const meta = {
  component: GithubBtn,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof GithubBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs = {};

export const Default: Story = {
  args: defaultArgs,
};
