import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockService } from "../../mocks/services";
import ServicePageMain from "./ServicePageMain";

const meta = {
  component: ServicePageMain,
} satisfies Meta<typeof ServicePageMain>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    services: [
      mockService("monelogue", { title: "MoneLogue", hasDetailPage: true }),
      mockService("weather-app", { kind: ["チーム開発"] }),
      mockService("ec-site", {
        title: "ECサイト",
        url: [{ fieldId: "url", url: "https://github.com/example/ec-site" }],
      }),
    ],
  },
};
