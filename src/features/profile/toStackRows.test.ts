import { describe, expect, it } from "vitest";

import type { Tags } from "@/infra/microCMS/schema/tags";

import { toStackRows } from "./toStackRows";

const labelsOf = (rows: ReturnType<typeof toStackRows>) =>
  rows.map((row) => row.label);

const tag = (id: string, name: string, type: Tags["type"]) => ({
  id,
  name,
  type,
  createdAt: "2026-07-25T15:54:26.220Z",
  updatedAt: "2026-07-25T15:54:26.220Z",
});

describe("toStackRows", () => {
  it("言語 → フレームワーク・ライブラリ → その他・ツール類 の順に 1 種別 1 行で並べる", () => {
    const rows = toStackRows([
      tag("blender", "Blender", ["その他・ツール類"]),
      tag("react", "React", ["ライブラリ"]),
      tag("typescript", "TypeScript", ["言語"]),
      tag("nextjs", "Next.js", ["フレームワーク"]),
      tag("github", "GitHub", ["その他・ツール類"]),
    ]);

    expect(labelsOf(rows)).toEqual([
      "TypeScript",
      "React / Next.js",
      "Blender / GitHub",
    ]);
  });

  it("行内は入力の順を保つ", () => {
    const rows = toStackRows([
      tag("github", "GitHub", ["その他・ツール類"]),
      tag("vercel", "Vercel", ["その他・ツール類"]),
    ]);

    expect(labelsOf(rows)).toEqual(["GitHub / Vercel"]);
  });

  it("トピックだけのタグは出さず、空になった行も出さない", () => {
    const rows = toStackRows([
      tag("frontend", "フロントエンド", ["トピック"]),
      tag("typescript", "TypeScript", ["言語"]),
    ]);

    expect(labelsOf(rows)).toEqual(["TypeScript"]);
  });

  it("複数の種別を持つタグは、トピック以外の最初の種別の行に入れる", () => {
    const rows = toStackRows([
      tag("nextjs", "Next.js", ["トピック", "フレームワーク", "言語"]),
    ]);

    expect(labelsOf(rows)).toEqual(["Next.js"]);
  });

  it("同じ id のタグが重複していても 1 回だけ並べる", () => {
    const rows = toStackRows([
      tag("nextjs", "Next.js", ["フレームワーク"]),
      tag("typescript", "TypeScript", ["言語"]),
      tag("nextjs", "Next.js", ["フレームワーク"]),
      tag("react", "React", ["ライブラリ"]),
    ]);

    expect(labelsOf(rows)).toEqual(["TypeScript", "Next.js / React"]);
  });

  it("別 id の同名タグで表示が同じ行になっても、行の id は種別ごとに異なる", () => {
    const rows = toStackRows([
      tag("swift-lang", "Swift", ["言語"]),
      tag("swift-ui", "Swift", ["フレームワーク"]),
    ]);

    expect(rows).toEqual([
      { id: "language", label: "Swift" },
      { id: "framework", label: "Swift" },
    ]);
  });

  it("タグが無ければ行も無い", () => {
    expect(toStackRows([])).toEqual([]);
  });
});
