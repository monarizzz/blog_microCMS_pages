import { BlogWithPlainTextList } from "../Blog/blog";

export type Category = {
  id: string;
  name: string;
};

export type CategoryWithBlog = {
  category: {
    name: string;
    id: string;
  };
  blogWithPlainTextList: BlogWithPlainTextList;
};

export type CategoryList = Category[];
export type CategoryWithBlogList = CategoryWithBlog[];

// export type BlogCategory = {
//   name: string;
//   id: string;
//   blogWithPlainTextList: BlogWithPlainTextList;
// };
// export type BlogCategoryList = BlogCategory[];
