import { load } from "cheerio";

const BLOCK_SELECTOR =
  "p, div, h1, h2, h3, h4, h5, h6, ul, ol, blockquote, pre, figure, table, hr";

/**
 * microCMS のリッチエディタの HTML を、段落を空行で区切った平文にする。
 *
 * タグを正規表現で消すだけだと `<p>一段目</p><p>二段目</p>` が繋がり、
 * 文字参照 (`&amp;` など) も残るため、cheerio で要素ごとにテキストを取り出す。
 * - 最上位のブロック要素 1 つを 1 段落とし、間に挟まる地の文やインライン要素は
 *   続けて 1 段落にまとめる（タグの無い文字列もそのまま 1 段落になる）
 * - 段落内の <br> は改行として残す
 * - リストは項目ごとに改行する
 * 太字やリンクなどの装飾は落ちる。表示側がプレーンテキストしか受けないため。
 */
export const richTextToPlainText = (html: string) => {
  const $ = load(html, null, false);
  $("br").replaceWith("\n");

  const paragraphs: string[] = [];
  let inline = "";
  const flushInline = () => {
    paragraphs.push(inline);
    inline = "";
  };

  for (const node of $.root().contents().toArray()) {
    const $node = $(node);
    if (!$node.is(BLOCK_SELECTOR)) {
      inline += $node.text();
      continue;
    }
    flushInline();
    paragraphs.push(
      $node.is("ul, ol")
        ? $node
            .children("li")
            .toArray()
            .map((item) => $(item).text().trim())
            .filter(Boolean)
            .join("\n")
        : $node.text(),
    );
  }
  flushInline();

  return paragraphs
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .join("\n\n");
};
