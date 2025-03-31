import { BlogList } from "../Blog/blogList";

export type BlogCategory = {
  name: string;
  blogList: {
    contents: BlogList;
  };
};
