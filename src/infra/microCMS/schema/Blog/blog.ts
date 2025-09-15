import { Category } from "../Category/category";

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  categories: Category[];
  title: string;
  body: string;
};

export type BlogWithPlainText = Pick<
  Blog,
  "id" | "publishedAt" | "categories" | "title"
> & { plainTextBody: string };

export type BlogList = Blog[];
export type BlogWithPlainTextList = BlogWithPlainText[];
