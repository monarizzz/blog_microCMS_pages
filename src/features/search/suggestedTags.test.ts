import { describe, expect, it } from "vitest";

import { SUGGESTED_TAG_COUNT, pickSuggestedTags } from "./suggestedTags";

describe("pickSuggestedTags", () => {
  it("付いている記事の多いタグから並べる", () => {
    expect(
      pickSuggestedTags([["設計"], ["Next.js", "設計"], ["Next.js", "設計"]]),
    ).toEqual(["設計", "Next.js"]);
  });

  it("同数なら先に現れたタグを優先する", () => {
    expect(pickSuggestedTags([["B", "A"], ["A", "B"], ["C"]])).toEqual([
      "B",
      "A",
      "C",
    ]);
  });

  it("1 記事の中で重なったタグは 1 と数える", () => {
    expect(pickSuggestedTags([["A", "A", "A"], ["B"], ["B"]])).toEqual([
      "B",
      "A",
    ]);
  });

  it(`既定では上位 ${SUGGESTED_TAG_COUNT} 件までに絞る`, () => {
    const names = ["A", "B", "C", "D", "E", "F"];
    expect(pickSuggestedTags([names])).toEqual(
      names.slice(0, SUGGESTED_TAG_COUNT),
    );
  });

  it("記事が無ければ空配列", () => {
    expect(pickSuggestedTags([])).toEqual([]);
  });
});
