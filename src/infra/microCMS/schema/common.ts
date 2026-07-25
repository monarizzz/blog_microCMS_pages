import type {
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSObjectContent,
} from "microcms-js-sdk";

export type { MicroCMSImage, MicroCMSListContent, MicroCMSObjectContent };

/**
 * 参照フィールドで返る他コンテンツ。
 * 参照先はメタ情報(id/createdAt など)が付いた状態で返る。
 */
export type Reference<T> = T & MicroCMSListContent;

/** 繰り返しフィールド内のカスタムフィールド */
export type RepeaterField<TFieldId extends string, TFields> = {
  fieldId: TFieldId;
} & TFields;

/** リッチエディタ / HTML 文字列 */
export type RichText = string;
