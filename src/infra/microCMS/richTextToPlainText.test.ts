import { describe, expect, it } from "vitest";

import { richTextToPlainText } from "./richTextToPlainText";

describe("richTextToPlainText", () => {
  it("段落を空行で区切って繋げる", () => {
    expect(richTextToPlainText("<p>一段目</p><p>二段目</p>")).toBe(
      "一段目\n\n二段目",
    );
  });

  it("文字参照を戻し、インラインのタグは中身だけ残す", () => {
    expect(
      richTextToPlainText(
        '<p>A &amp; B は<strong>大事</strong>。<a href="https://example.com">リンク</a></p>',
      ),
    ).toBe("A & B は大事。リンク");
  });

  it("段落内の <br> は改行として残す", () => {
    expect(richTextToPlainText("<p>1 行目<br>2 行目</p>")).toBe(
      "1 行目\n2 行目",
    );
  });

  it("リストは項目ごとに改行する", () => {
    expect(
      richTextToPlainText("<p>機能</p><ul><li>記録</li><li>集計</li></ul>"),
    ).toBe("機能\n\n記録\n集計");
  });

  it("空の段落は捨て、前後の空白を落とす", () => {
    expect(richTextToPlainText("<p> 本文 </p><p></p><p><br></p>")).toBe("本文");
  });

  it("タグを含まない文字列はそのまま返す", () => {
    expect(richTextToPlainText("ただの文章")).toBe("ただの文章");
  });

  it("ブロックの間の地の文とインライン要素は 1 段落にまとめる", () => {
    expect(
      richTextToPlainText("前文<strong>強調</strong>続き<p>段落</p>後文"),
    ).toBe("前文強調続き\n\n段落\n\n後文");
  });

  it("空文字は空文字", () => {
    expect(richTextToPlainText("")).toBe("");
  });
});
