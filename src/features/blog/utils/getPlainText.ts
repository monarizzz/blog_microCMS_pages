import * as cheerio from "cheerio";

export const getPlainText = (html: string): string => {
  const $ = cheerio.load(html);
  $("br").replaceWith("\n");
  $("h1, h2, h3, h4, h5, h6, p, li, blockquote").append("\n\n");
  return $.text()
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};
