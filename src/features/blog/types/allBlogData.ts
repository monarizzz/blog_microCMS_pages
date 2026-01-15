import { Blog } from "@/libs/schema/Blog/blog";

export type AllBlogData = {
  contents: Pick<Blog, "id" | "title" | "publishedAt">[];
};
