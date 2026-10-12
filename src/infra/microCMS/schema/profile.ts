import { MicroCMSDate, MicroCMSListContent } from "microcms-js-sdk";
import { Tags } from "./tags";

export type ProfileContents = {
  name: string;
  bio: string;
  tags: (Tags & MicroCMSListContent)[];
};

export type Profile = ProfileContents & MicroCMSDate;
