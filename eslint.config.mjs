// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import storybook from "eslint-plugin-storybook";

const eslintConfig = [
  {
    ignores: [
      // _v2 は旧実装。tsconfig / .prettierignore でも除外済みで手を入れない
      "_v2/**",
      // worktree はそれぞれのブランチ側で lint する
      ".claude/worktrees/**",
      ".next/**",
      "node_modules/**",
      "storybook-static/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...storybook.configs["flat/recommended"],
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "better-tailwindcss": betterTailwindcss },
    settings: {
      "better-tailwindcss": {
        // Tailwind v4 は tailwind.config.js を持たず @theme を CSS に書くため、
        // 登録済みクラスの判定元となる CSS を明示する
        entryPoint: "src/app/_styles/globals.css",
      },
    },
    rules: {
      // クラスの並び替え・改行整形は prettier-plugin-tailwindcss に任せるため、
      // 整形系ルール (enforce-consistent-class-order /
      // enforce-consistent-line-wrapping) は有効化しない
      "better-tailwindcss/no-conflicting-classes": "error",
      "better-tailwindcss/no-duplicate-classes": "error",
      "better-tailwindcss/no-unnecessary-whitespace": "error",
      "better-tailwindcss/no-unknown-classes": "error",
      "better-tailwindcss/no-deprecated-classes": "error",
      // h-[180px] のような任意値を、トークンで表せる正規クラス (h-45) に寄せる。
      // rootFontSize を渡さないと px → spacing スケールの変換が働かず、
      // bg-[#fff] → bg-white のような色の正規化しか効かない
      "better-tailwindcss/enforce-canonical-classes": [
        "error",
        { rootFontSize: 16 },
      ],
    },
  },
];

export default eslintConfig;
