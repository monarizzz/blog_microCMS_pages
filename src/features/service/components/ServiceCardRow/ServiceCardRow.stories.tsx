import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { mockService } from "../../mocks/services";
import ServiceCardRow from "./ServiceCardRow";

const meta = {
  component: ServiceCardRow,
} satisfies Meta<typeof ServiceCardRow>;

export default meta;

type Story = StoryObj<typeof meta>;

const weatherApp = mockService("weather-app", {
  url: [
    { fieldId: "url", url: "https://example.com" },
    { fieldId: "url", url: "https://github.com/example/weather-app" },
  ],
});

export const Single: Story = {
  args: {
    services: [weatherApp],
  },
};

export const Double: Story = {
  args: {
    services: [
      weatherApp,
      mockService("ec-site", {
        title: "ECサイト",
        kind: ["チーム開発"],
        url: [{ fieldId: "url", url: "https://example.com" }],
      }),
    ],
  },
};
