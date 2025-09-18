import * as cheerio from "cheerio";
import { Blog } from "@/libs/schema/Blog/blog";

const renderToc = ({ body }: Blog) => {
  const $ = cheerio.load(body);
  const headings = $("h1, h2, h3").toArray();
  const toc = headings.map((data) => ({
    text: $(data).text(),
    id: data.attribs.id,
  }));

  return toc;
};

export default renderToc;
