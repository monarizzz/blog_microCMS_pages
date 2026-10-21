/**
 * 記事本文を組み立てるブロック。
 *
 * microCMS のリッチエディタ HTML を将来この形へ変換する想定で、
 * pen の Article Detail に出てくる要素だけを定義している
 * （画像・引用・トグルなどは Blocks Catalog にあるが本文では未使用）。
 */
export type ArticleBlock =
  | { type: "paragraph"; text: string }
  /** `id` は目次のアンカー先になる */
  | { type: "heading2"; id: string; text: string }
  | { type: "bulletList"; items: string[] }
  | { type: "code"; language?: string; code: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  /** pen の InfoCard (q6phow)。本文の途中に挟む囲みカード */
  | { type: "infoCard"; text: string };
