import { Blog } from "@/infra/microCMS/schema/Blog/blog";

export type AdjacentArticle = Pick<Blog, "id" | "title"> | null;

export type ArticleNavigation = {
  prevArticle: AdjacentArticle;
  nextArticle: AdjacentArticle;
};
