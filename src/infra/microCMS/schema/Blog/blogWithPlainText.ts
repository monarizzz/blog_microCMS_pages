import { Blog } from "./blog";

export type BlogWithPlainText = Blog & {
  plainTextBody: string;
};

export type BlogWithPlainTextList = BlogWithPlainText[];