import * as cheerio from "cheerio";

const getPlainText = (htmlStrings: string) => {
  const $ = cheerio.load(htmlStrings);
  $("br").replaceWith(" ");
  $("h1, h2, h3, h4, h5, h6, p, li, blockquote").append(" ");
  return $.text().replace(/\s+/g, " ").trim().slice(0, 150);
};

export default getPlainText;
