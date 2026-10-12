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
      // @theme が --spacing-md 等「サイズ名の spacing キー」を定義しているため、
      // max-w-md は 448px ではなく --spacing-md (24px) に解決される。
      // Tailwind v4 のサイジング系ユーティリティは
      // --max-width → --spacing → --container の順で名前を引き、
      // --spacing が --container より先に当たるので、
      // --container-* を定義しても上書きできない (実測で確認済み)。
      // 値が消えず別の値になるだけなので型も lint も通り、見た目でしか気づけない。
      // サイジング用途でサイズ名を使うこと自体を機械的に止める。
      "better-tailwindcss/no-restricted-classes": [
        "error",
        {
          restrict: [
            {
              message:
                'サイジングに "$3" を使うと spacing スケール (--spacing-$3) に解決されます。max-w-112 のように数値スケールか、任意値で指定してください。',
              pattern:
                "(^|:)-?(max-w|min-w|w|max-h|min-h|h|size|basis)-(2xs|xs|sm|md|lg|2xl|3xl|4xl|5xl|xl)$",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
