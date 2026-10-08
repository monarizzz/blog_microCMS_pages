import * as cheerio from "cheerio";

const tocFn = (body: string) => {
  const $ = cheerio.load(body);
  const headings = $("h1, h2, h3").toArray();
  const toc = headings.map((heading) => ({
    text: $(heading).text(),
    id: heading.attribs.id,
  }));

  return toc;
};

export default tocFn;
