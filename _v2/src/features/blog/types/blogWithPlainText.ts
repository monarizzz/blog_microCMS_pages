import { Blog } from "@/libs/schema/contents/Blog/blog";

export type BlogWithPlainText = Pick<
  Blog,
  "id" | "publishedAt" | "categories" | "title"
> & { plainTextBody: string };
