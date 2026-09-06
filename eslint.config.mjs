// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import storybook from "eslint-plugin-storybook";

const eslintConfig = [
  {
    // _v2 は旧実装。tsconfig / .prettierignore でも除外済みで手を入れないため lint 対象外
    ignores: ["_v2/**", ".next/**", "node_modules/**", "storybook-static/**"],
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
      // recommended に含まれる整形系ルール (enforce-consistent-class-order /
      // enforce-consistent-line-wrapping) は有効化しない
      "better-tailwindcss/no-conflicting-classes": "warn",
      "better-tailwindcss/no-duplicate-classes": "warn",
      "better-tailwindcss/no-unnecessary-whitespace": "warn",
      "better-tailwindcss/no-unregistered-classes": "warn",
      // トークンは tokens.css / globals.css の @theme に集約する方針なので、
      // 任意値 (max-w-[1100px] 等) の混入を検知する。
      // 既存コードに残存があるため、まずは warn で導入する
      "better-tailwindcss/no-restricted-classes": [
        "warn",
        {
          restrict: [
            {
              message:
                "任意値 '$0' ではなく tokens.css / globals.css の @theme に定義したトークンを使ってください",
              pattern: ".*-\\[.*\\].*",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
