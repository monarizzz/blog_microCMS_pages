import { Blog } from "@/libs/schema/contents/Blog/blog";

export type AdjacentBlog = Pick<Blog, "id" | "title">;

export type BlogNavigation = {
  backBlog: AdjacentBlog | null;
  nextBlog: AdjacentBlog | null;
};
