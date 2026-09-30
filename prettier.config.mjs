/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  // Tailwind v4 は tailwind.config.js を持たず @theme を CSS に書くため、
  // クラス並び替えプラグインへ設定元の CSS を明示する必要がある
  tailwindStylesheet: "./src/app/_styles/globals.css",
};
