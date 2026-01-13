import { Blog } from "@/libs/schema/Blog/blog";

export type BlogWithPlainText = Pick<
  Blog,
  "id" | "publishedAt" | "categories" | "title"
> & { plainTextBody: string };

export type BlogWithPlainTextList = BlogWithPlainText[];
