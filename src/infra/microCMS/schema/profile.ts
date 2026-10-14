import {
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";
import { Tags } from "./tags";

export type ProfileContents = {
  name: string;
  bio: string;
  // 任意の複数参照なので、未入力やフィールド追加前のレスポンスでは
  // [] ではなく null やキー自体の欠落になりうる。利用側で ?? [] に寄せる
  tags?: (Tags & MicroCMSListContent)[] | null;
  // 未入力のほか、microCMS 側へフィールドを追加する前のレスポンスでは
  // キー自体が無いため、undefined と null の両方を許す
  image?: MicroCMSImage | null;
};

export type Profile = ProfileContents & MicroCMSDate;
