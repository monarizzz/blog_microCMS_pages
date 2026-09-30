import { BlogWithPlainText } from "@/features/blog/types/blogWithPlainText";

export type Category = {
  id: string;
  name: string;
};

export type BlogsByCategory = {
  category: {
    name: string;
    id: string;
  };
  blogWithPlainTextList: BlogWithPlainText[];
};
