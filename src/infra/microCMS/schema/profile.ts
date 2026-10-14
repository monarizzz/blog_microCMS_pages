import { MicroCMSDate, MicroCMSListContent } from "microcms-js-sdk";
import { Tags } from "./tags";

export type ProfileContents = {
  name: string;
  bio: string;
  tags: (Tags & MicroCMSListContent)[];
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
