import { Blog } from "@/infra/microCMS/schema/Blog/blog";

export type adjacentArticle = Pick<Blog, "id" | "title"> | null;

export type articleNavigation = {
  prevArticle: adjacentArticle;
  nextArticle: adjacentArticle;
};
