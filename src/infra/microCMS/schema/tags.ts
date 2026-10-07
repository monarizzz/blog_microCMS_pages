import { MicroCMSListContent } from "microcms-js-sdk";

export type Tags = MicroCMSListContent & TagsContents;

export type TagsContents = {
  type: TagsContentsTypes[];
  name: string;
};

export type TagsContentsTypes =
  | "トピック"
  | "言語"
  | "フレームワーク"
  | "ライブラリ"
  | "その他・ツール類";
