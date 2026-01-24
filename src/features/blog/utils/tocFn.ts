import * as cheerio from "cheerio";
import { Blog } from "@/libs/schema/contents/Blog/blog";

const tocFn = ({ body }: Blog) => {
  const $ = cheerio.load(body);
  const headings = $("h1, h2, h3").toArray();
  const toc = headings.map((data) => ({
    text: $(data).text(),
    id: data.attribs.id,
  }));

  return toc;
};

export default tocFn;
