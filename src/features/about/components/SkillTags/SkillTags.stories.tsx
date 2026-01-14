import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SkillTags from "./SkillTags";

const meta = {
  component: SkillTags,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SkillTags>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    skill: "Next.js",
  },
};
