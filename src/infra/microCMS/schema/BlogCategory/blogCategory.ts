import { BlogList } from "../Blog/blogList";

export type BlogCategory = {
  name: string;
  id: string;
  blogList: {
    contents: BlogList;
  };
};
