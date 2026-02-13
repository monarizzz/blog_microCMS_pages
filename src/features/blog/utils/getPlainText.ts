import * as cheerio from "cheerio";

const getPlainText = (htmlStrings: string) => {
  const $ = cheerio.load(htmlStrings);
  $("br").replaceWith("\n");
  $("h1, h2, h3, h4, h5, h6, p, li, blockquote").append("\n\n");
  return $.text()
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, 150);
};

export default getPlainText;
