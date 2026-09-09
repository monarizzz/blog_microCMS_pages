import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";

import PageNavNum from "./PageNumNav";

const meta = {
  component: PageNavNum,
} satisfies Meta<typeof PageNavNum>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

/** 中間ページ。現在ページの前後 1 ページ（4 / 6）が出ること（1 2 3 4 5 6 … 10） */
export const Middle: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("link", { name: "4" })).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "6" })).toBeInTheDocument();
  },
};

/** 先頭 3 ページから離れた中間ページ。前後が両側の省略記号に挟まれること（1 2 3 … 6 7 8 … 10） */
export const MiddleFar: Story = {
  args: {
    currentPage: 7,
    totalPages: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("link", { name: "6" })).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "8" })).toBeInTheDocument();
  },
};

export const Last: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

export const Few: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
  },
};

/** sort などのクエリを引き継ぐケース（例: /article?sort=old&page=3） */
export const WithQuery: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    basePath: "/article",
    // page はコンポーネントが組み立てるので、渡しても捨てられる
    query: { sort: "old", page: "3" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1 ページ目は page を付けず、sort だけ引き継ぐ
    await expect(canvas.getByRole("link", { name: "1" })).toHaveAttribute(
      "href",
      "/article?sort=old",
    );
    await expect(canvas.getByRole("link", { name: "2" })).toHaveAttribute(
      "href",
      "/article?sort=old&page=2",
    );
    await expect(canvas.getByRole("link", { name: "10" })).toHaveAttribute(
      "href",
      "/article?sort=old&page=10",
    );
    await expect(
      canvas.getByRole("link", { name: "前のページ" }),
    ).toHaveAttribute("href", "/article?sort=old&page=2");
    await expect(
      canvas.getByRole("link", { name: "次のページ" }),
    ).toHaveAttribute("href", "/article?sort=old&page=4");
  },
};

/** query 無しのとき、従来どおり page だけの URL になること */
export const WithoutQuery: Story = {
  args: {
    currentPage: 2,
    totalPages: 10,
    basePath: "/article",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("link", { name: "1" })).toHaveAttribute(
      "href",
      "/article",
    );
    await expect(canvas.getByRole("link", { name: "3" })).toHaveAttribute(
      "href",
      "/article?page=3",
    );
  },
};
