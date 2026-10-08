import { Category } from "../Category/category";

export type Env = "prod" | "stg" | "dev";

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  categories: Category[];
  title: string;
  body: string;
  development_env: Env[];
};
