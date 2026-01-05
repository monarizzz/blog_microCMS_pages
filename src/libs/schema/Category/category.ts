import { BlogWithPlainTextList } from "../Blog/blog";

export type Category = {
  id: string;
  name: string;
};

export type BlogsByCategory = {
  category: {
    name: string;
    id: string;
  };
  blogWithPlainTextList: BlogWithPlainTextList;
};

export type CategoryList = Category[];
export type BlogsByCategoryList = BlogsByCategory[];
