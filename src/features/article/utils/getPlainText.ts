import * as cheerio from "cheerio";

/**
 * ブログの本文（HTML）からプレーンテキストを抽出し、指定された文字数で要約します。
 * @param html - ブログの本文（HTML形式）
 * @param maxLength - 抽出する最大文字数
 * @returns プレーンテキストの要約
 */
export const getPlainText = (html: string, maxLength: number = 150): string => {
  const $ = cheerio.load(html);
  // 適切に改行を挿入して、文章の区切りを表現
  $("br").replaceWith("\n");
  $("h1, h2, h3, h4, h5, h6, p, li, blockquote").append("\n\n");
  const plainText = $.text().replace(/\n{3,}/g, "\n\n").trim();

  return plainText.slice(0, maxLength);
};
