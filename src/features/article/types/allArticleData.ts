import { Blog } from "@/libs/schema/Blog/blog";

export type AllArticleData = {
  contents: Pick<Blog, "id" | "title" | "publishedAt">[];
};
