import { Blog } from "@/libs/schema/Blog/blog";

export type AdjacentBlog = Pick<Blog, "id" | "title"> | null;

export type BlogNavigation = {
  prevBlog?: AdjacentBlog;
  nextBlog?: AdjacentBlog;
};
