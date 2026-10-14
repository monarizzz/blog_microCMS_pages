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
  // 任意の繰り返しフィールドは、未入力やフィールド追加前のコンテンツで
  // [] ではなく null やキー自体の欠落になりうるため、利用側で ?? [] に寄せる
  milestones?: Milestone[] | null;
};

/** Timeline に年と名前だけを出す目盛り（使い始めたツールなど）。experiences と違い詳細を持たない */
export type Milestone = {
  fieldId: "milestone";
  date: string;
  title: string;
  emphasized?: boolean;
};

export type Profile = ProfileContents & MicroCMSDate;
