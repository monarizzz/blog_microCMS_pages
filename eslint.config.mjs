// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import storybook from "eslint-plugin-storybook";

const eslintConfig = [
  {
    // _v2 は旧実装。tsconfig / .prettierignore でも除外済みで手を入れないため lint 対象外
    ignores: ["_v2/**", ".next/**", "node_modules/**", "storybook-static/**"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...storybook.configs["flat/recommended"],
];

export default eslintConfig;
