import type { ArticleInline } from "./articleInline";

/** リストの 1 項目 */
export type ArticleListItem = {
  content: ArticleInline[];
};

/**
 * 記事本文を組み立てるブロック。
 *
 * microCMS のリッチエディタ HTML を将来この形へ変換する想定で、
 * pen の Article Detail に出てくる要素だけを定義している
 * （画像・引用・トグルなどは Blocks Catalog にあるが本文では未使用）。
 * 文字を持つブロックは、装飾とリンクを残すため区間の配列で持つ。
 */
export type ArticleBlock =
  | { type: "paragraph"; content: ArticleInline[] }
  /** `id` は目次のアンカー先になる。目次に出すので平文で持つ */
  | { type: "heading2"; id: string; text: string }
  | { type: "bulletList"; items: ArticleListItem[] }
  | { type: "code"; language?: string; code: string }
  | {
      type: "table";
      headers: ArticleInline[][];
      rows: ArticleInline[][][];
    }
  /** pen の InfoCard (q6phow)。本文の途中に挟む囲みカード */
  | { type: "infoCard"; content: ArticleInline[] };
