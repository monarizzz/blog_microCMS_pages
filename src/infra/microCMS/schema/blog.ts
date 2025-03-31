import { Category } from "./category";

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
