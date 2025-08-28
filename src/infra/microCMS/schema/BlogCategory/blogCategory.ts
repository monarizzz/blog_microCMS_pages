import { BlogWithPlainTextList } from "../Blog/blogWithPlainText";

export type BlogCategory = {
  name: string;
  id: string;
  blogWithPlainTextList:  BlogWithPlainTextList;
};
export type BlogCategoryList = BlogCategory[];
