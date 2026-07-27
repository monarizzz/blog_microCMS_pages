import { MicroCMSListContent } from "microcms-js-sdk";
import { Tags } from "./tags";

export type Profile = {
  name: string;
  bio: string;
  tags: (Tags & MicroCMSListContent)[];
};
