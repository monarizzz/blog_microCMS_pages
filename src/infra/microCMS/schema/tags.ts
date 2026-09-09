export type Tags = {
  type: Types[];
  name: string;
};

export type Types =
  | "トピック"
  | "言語"
  | "フレームワーク"
  | "ライブラリ"
  | "その他・ツール類";
