import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/app/_styles/fonts";
import "../src/app/_styles/globals.css";

const preview: Preview = {
  // 本番の <html> と同じフォント変数を流す。無いと Storybook だけ書体が変わる。
  // tokens.css の --font-family-sans は :root で var() を解決するため、
  // ラッパー要素ではなく documentElement に付ける必要がある
  decorators: [
    (Story) => {
      document.documentElement.classList.add(...fontVariables.split(" "));
      return <Story />;
    },
  ],

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
      test: "error",
    },
  },
};

export default preview;
