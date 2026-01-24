import { Blog } from "@/libs/schema/contents/Blog/blog";

export type AllBlogData = {
  contents: Pick<Blog, "id" | "title" | "publishedAt">[];
};
