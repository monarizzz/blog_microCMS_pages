import { BlogList } from "../Blog/blog";

export type BlogCategory = {
  id: string;
  name: string;
  blogList: {
    contents: BlogList;
  };
};
export type BlogCategoryList = BlogCategory[];
