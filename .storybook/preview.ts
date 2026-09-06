import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/_styles/globals.css";

const preview: Preview = {
  parameters: {
    // 個別 Story で上書き可
    layout: "fullscreen",

    options: {
      // 未指定だと登録順になるため、サイドバーの並びを明示する
      storySort: {
        method: "alphabetical",
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
