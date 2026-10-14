import { describe, expect, it } from "vitest";

import { toArticleBlocks } from "./toArticleBlocks";

describe("toArticleBlocks", () => {
  describe("段落と文字装飾", () => {
    it("段落内の装飾とリンクを区間に分け、同じ装飾の隣り合う区間はつなぐ", () => {
      expect(
        toArticleBlocks(
          '<p>設定は <code>.git/config</code> にある。<strong>太字</strong><strong>続き</strong>と<a href="https://example.com"><strong>リンク</strong></a></p>',
        ),
      ).toEqual([
        {
          type: "paragraph",
          content: [
            { text: "設定は " },
            { text: ".git/config", marks: ["code"] },
            { text: " にある。" },
            { text: "太字続き", marks: ["bold"] },
            { text: "と" },
            {
              text: "リンク",
              marks: ["bold"],
              href: "https://example.com",
            },
          ],
        },
      ]);
    });

    it("斜体・取り消し線・下線を装飾として拾い、入れ子の装飾は重ねる", () => {
      expect(
        toArticleBlocks(
          "<p><em>斜体</em><s>消</s><u><strong>両方</strong></u></p>",
        ),
      ).toEqual([
        {
          type: "paragraph",
          content: [
            { text: "斜体", marks: ["italic"] },
            { text: "消", marks: ["strike"] },
            { text: "両方", marks: ["underline", "bold"] },
          ],
        },
      ]);
    });

    it("<br> は改行にし、段落の末尾の改行は落とす", () => {
      expect(toArticleBlocks("<p>1 行目<br>2 行目<br></p>")).toEqual([
        { type: "paragraph", content: [{ text: "1 行目\n2 行目" }] },
      ]);
    });

    it("文字参照はデコードする", () => {
      expect(toArticleBlocks("<p>&lt;div&gt; &amp; &quot;</p>")).toEqual([
        { type: "paragraph", content: [{ text: '<div> & "' }] },
      ]);
    });

    it("空行として残された中身の無い段落は捨てる", () => {
      expect(
        toArticleBlocks("<p></p><p><br></p><p>&nbsp;</p><p>本文</p>"),
      ).toEqual([{ type: "paragraph", content: [{ text: "本文" }] }]);
    });

    it("http(s) / mailto / サイト内以外のリンク先は外し、文字は残す", () => {
      expect(
        toArticleBlocks(
          '<p><a href="javascript:alert(1)">危険</a><a href="/article">内部</a><a href="mailto:a@example.com">メール</a></p>',
        ),
      ).toEqual([
        {
          type: "paragraph",
          content: [
            { text: "危険" },
            { text: "内部", href: "/article" },
            { text: "メール", href: "mailto:a@example.com" },
          ],
        },
      ]);
    });

    it("ブロック要素に包まれていない地の文も段落にする", () => {
      expect(toArticleBlocks("地の文<strong>だけ</strong>")).toEqual([
        {
          type: "paragraph",
          content: [{ text: "地の文" }, { text: "だけ", marks: ["bold"] }],
        },
      ]);
    });
  });

  describe("見出し", () => {
    it("h2 始まりの記事は h2 を節、h3 以降を小見出しにし、リッチエディタの id を使う", () => {
      expect(
        toArticleBlocks(
          '<h2 id="ha">背景</h2><h3 id="hb">概要</h3><h4 id="hc">細目</h4>',
        ),
      ).toEqual([
        { type: "heading2", id: "ha", text: "背景" },
        { type: "heading3", id: "hb", text: "概要" },
        { type: "heading3", id: "hc", text: "細目" },
      ]);
    });

    it("h1 始まりの記事は h1 を節、h2 を小見出しにする", () => {
      expect(
        toArticleBlocks('<h1 id="ha">環境</h1><h2 id="hb">その１</h2>'),
      ).toEqual([
        { type: "heading2", id: "ha", text: "環境" },
        { type: "heading3", id: "hb", text: "その１" },
      ]);
    });

    it("h3 しか無い記事は h3 を節にする", () => {
      expect(toArticleBlocks('<h3 id="ha">唯一の見出し</h3>')).toEqual([
        { type: "heading2", id: "ha", text: "唯一の見出し" },
      ]);
    });

    it("id が無い・重複する見出しには連番の id を振る", () => {
      expect(
        toArticleBlocks('<h2>一</h2><h2 id="hx">二</h2><h2 id="hx">三</h2>'),
      ).toEqual([
        { type: "heading2", id: "heading-1", text: "一" },
        { type: "heading2", id: "hx", text: "二" },
        { type: "heading2", id: "heading-2", text: "三" },
      ]);
    });

    it("見出しの装飾は落として平文にし、空の見出しは捨てる", () => {
      expect(
        toArticleBlocks(
          '<h2 id="ha"><strong>強調</strong>見出し</h2><h2></h2>',
        ),
      ).toEqual([{ type: "heading2", id: "ha", text: "強調見出し" }]);
    });
  });

  describe("リスト", () => {
    it("入れ子のリストは項目の children に入れる", () => {
      expect(
        toArticleBlocks(
          "<ul><li>親<ul><li>子1</li><li>子2</li></ul></li><li>次</li></ul>",
        ),
      ).toEqual([
        {
          type: "bulletList",
          items: [
            {
              content: [{ text: "親" }],
              children: [
                {
                  type: "bulletList",
                  items: [
                    { content: [{ text: "子1" }] },
                    { content: [{ text: "子2" }] },
                  ],
                },
              ],
            },
            { content: [{ text: "次" }] },
          ],
        },
      ]);
    });

    it("番号付きリストは start を引き継ぎ、項目末尾の <br> は落とす", () => {
      expect(
        toArticleBlocks('<ol start="3"><li>三<br></li><li>四</li></ol>'),
      ).toEqual([
        {
          type: "numberedList",
          start: 3,
          items: [{ content: [{ text: "三" }] }, { content: [{ text: "四" }] }],
        },
      ]);
    });

    it("項目の中の画像やコードは children に入れる", () => {
      expect(
        toArticleBlocks(
          '<ol><li>確認する<pre><code class="language-bash">$ node -v</code></pre></li></ol>',
        ),
      ).toEqual([
        {
          type: "numberedList",
          items: [
            {
              content: [{ text: "確認する" }],
              children: [{ type: "code", language: "bash", code: "$ node -v" }],
            },
          ],
        },
      ]);
    });
  });

  describe("コード", () => {
    it("language-* のクラスから言語を取り、中身の文字参照はデコードする", () => {
      expect(
        toArticleBlocks(
          '<pre><code class="language-tsx">const a = &lt;A /&gt;;\nreturn a;</code></pre>',
        ),
      ).toEqual([
        { type: "code", language: "tsx", code: "const a = <A />;\nreturn a;" },
      ]);
    });

    it("div[data-filename] で包まれたコードはファイル名を持つ", () => {
      expect(
        toArticleBlocks(
          '<div data-filename=".env"><pre><code>TOKEN=xxx</code></pre></div>',
        ),
      ).toEqual([{ type: "code", filename: ".env", code: "TOKEN=xxx" }]);
    });
  });

  describe("表", () => {
    it("1 行目がすべて th なら見出し行にし、セル内の段落は区間にする", () => {
      expect(
        toArticleBlocks(
          '<table><tbody><tr><th colspan="1" rowspan="1"><p><strong>観点</strong></p></th><th><p>結果</p></th></tr><tr><td><p>速さ</p></td><td><p>◎</p></td></tr></tbody></table>',
        ),
      ).toEqual([
        {
          type: "table",
          headers: [[{ text: "観点", marks: ["bold"] }], [{ text: "結果" }]],
          rows: [[[{ text: "速さ" }], [{ text: "◎" }]]],
        },
      ]);
    });

    it("th の行が無ければ見出し行は空にする", () => {
      expect(
        toArticleBlocks(
          "<table><tbody><tr><td><p>home</p></td><td><p>文頭</p></td></tr></tbody></table>",
        ),
      ).toEqual([
        {
          type: "table",
          headers: [],
          rows: [[[{ text: "home" }], [{ text: "文頭" }]]],
        },
      ]);
    });
  });

  describe("その他のブロック", () => {
    it("引用の複数段落は改行でつなぐ", () => {
      expect(
        toArticleBlocks("<blockquote><p>一</p><p>二</p></blockquote>"),
      ).toEqual([{ type: "quote", content: [{ text: "一\n二" }] }]);
    });

    it("figure の画像は寸法とキャプションを持つ", () => {
      expect(
        toArticleBlocks(
          '<figure><img src="https://images.microcms-assets.io/a.jpg?w=500&amp;h=281" alt="様子" width="500" height="281"><figcaption>キックオフ</figcaption></figure>',
        ),
      ).toEqual([
        {
          type: "image",
          src: "https://images.microcms-assets.io/a.jpg?w=500&h=281",
          alt: "様子",
          width: 500,
          height: 281,
          caption: "キックオフ",
        },
      ]);
    });

    it("http(s) 以外の画像は捨てる", () => {
      expect(
        toArticleBlocks(
          '<figure><img src="data:image/png;base64,AA"></figure>',
        ),
      ).toEqual([]);
    });

    it("全体が span.callout の段落は InfoCard にする", () => {
      expect(
        toArticleBlocks(
          '<p><strong><span class="callout"><u>注意</u>：</span></strong><span class="callout">仕様変更</span><br><span class="callout">2 行目</span></p>',
        ),
      ).toEqual([
        {
          type: "infoCard",
          content: [
            { text: "注意", marks: ["bold", "underline"] },
            { text: "：", marks: ["bold"] },
            { text: "仕様変更\n2 行目" },
          ],
        },
      ]);
    });

    it("callout の外に文字がある段落は普通の段落のまま", () => {
      expect(
        toArticleBlocks('<p>前置き<span class="callout">囲み</span></p>'),
      ).toEqual([{ type: "paragraph", content: [{ text: "前置き囲み" }] }]);
    });

    it("<hr> は区切り線にする", () => {
      expect(toArticleBlocks("<p>上</p><hr><p>下</p>")).toEqual([
        { type: "paragraph", content: [{ text: "上" }] },
        { type: "divider" },
        { type: "paragraph", content: [{ text: "下" }] },
      ]);
    });

    it("埋め込みの iframe と script は捨てる", () => {
      expect(
        toArticleBlocks(
          '<iframe src="https://example.com"></iframe><script>alert(1)</script><p>本文</p>',
        ),
      ).toEqual([{ type: "paragraph", content: [{ text: "本文" }] }]);
    });

    it("描き分けの無い要素は囲みを外して中身を拾う", () => {
      expect(
        toArticleBlocks("<section><h2>節</h2><p>本文</p></section>"),
      ).toEqual([
        { type: "heading2", id: "heading-1", text: "節" },
        { type: "paragraph", content: [{ text: "本文" }] },
      ]);
    });

    it("空文字列は空のブロック列になる", () => {
      expect(toArticleBlocks("")).toEqual([]);
    });
  });
});
