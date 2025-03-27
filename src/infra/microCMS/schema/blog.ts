import { CategoryId } from "./CategoryId";

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  categories: CategoryId[];
  title: string;
  body: string;
};
