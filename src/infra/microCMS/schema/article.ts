import { MicroCMSListContent } from "microcms-js-sdk";
import { Tags } from "./tags";

export type Article = {
  title: string;
  tags: (Tags & MicroCMSListContent)[];
  content: string;
};
