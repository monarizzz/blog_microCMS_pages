import {
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";
import { Tags } from "./tags";

export type ProfileContents = {
  name: string;
  bio: string;
  tags: (Tags & MicroCMSListContent)[];
  // 未入力のほか、microCMS 側へフィールドを追加する前のレスポンスでは
  // キー自体が無いため、undefined と null の両方を許す
  image?: MicroCMSImage | null;
};

export type Profile = ProfileContents & MicroCMSDate;
