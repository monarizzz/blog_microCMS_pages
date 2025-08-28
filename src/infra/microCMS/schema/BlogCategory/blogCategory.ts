import { BlogWithPlainTextList } from "../Blog/blogWithPlainText";

export type BlogCategory = {
  name: string;
  id: string;
  blogWithPlainTextList: {
    contents: BlogWithPlainTextList;
    // contents: BlogList;
  };
};
export type BlogCategoryList = BlogCategory[];
