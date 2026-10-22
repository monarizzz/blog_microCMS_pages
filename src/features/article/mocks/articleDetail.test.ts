import { describe, expect, it } from "vitest";

import { toArticleBlocks } from "../toArticleBlocks";
import { mockArticleDetail } from "./articleDetail";
import { MOCK_ARTICLE_CONTENT_HTML } from "./articleDetailHtml";

describe("mockArticleDetail", () => {
  it("ストーリーの本文ブロックは、モックの HTML を変換した結果と一致する", () => {
    expect(mockArticleDetail.blocks).toEqual(
      toArticleBlocks(MOCK_ARTICLE_CONTENT_HTML),
    );
  });
});
