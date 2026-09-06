import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import IconBtn, { type IconName } from "./IconBtn";

const iconNames: IconName[] = ["arrowUpRight", "link", "x"];

const meta = {
  component: IconBtn,
  argTypes: {
    icon: {
      control: "select",
      options: iconNames,
    },
  },
} satisfies Meta<typeof IconBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ArrowUpRight: Story = {
  args: {
    icon: "arrowUpRight",
    link: "https://example.com",
    label: "外部リンクを開く",
  },
};

export const CopyLink: Story = {
  args: {
    icon: "link",
    link: "https://example.com",
    label: "リンクをコピー",
  },
};

export const X: Story = {
  args: {
    icon: "x",
    link: "https://x.com/intent/post",
    label: "Xでシェア",
  },
};

export const AllIcons: Story = {
  args: {
    icon: "arrowUpRight",
    link: "/",
    label: "アイコン一覧",
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      {iconNames.map((icon) => (
        <div key={icon} className="flex flex-col items-center gap-2">
          <IconBtn icon={icon} link="/" label={icon} />
          <span className="text-xs text-on-surface-variant">{icon}</span>
        </div>
      ))}
    </div>
  ),
};
