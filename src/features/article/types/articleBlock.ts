import type { ArticleInline } from "./articleInline";

/** リストの 1 項目 */
export type ArticleListItem = {
  content: ArticleInline[];
  /** 項目の下にぶら下がるブロック（入れ子のリスト・コード・画像など） */
  children?: ArticleBlock[];
};

/**
 * 記事本文を組み立てるブロック。
 *
 * microCMS のリッチエディタ HTML を変換した結果で、pen の Article Detail と
 * Blocks Catalog にある要素のうち、リッチエディタが出力しうるものを定義している
 * （チェックボックス・トグル・ブックマークはリッチエディタに無いので持たない）。
 * 文字を持つブロックは、装飾とリンクを残すため区間の配列で持つ。
 */
export type ArticleBlock =
  | { type: "paragraph"; content: ArticleInline[] }
  /** 節の見出し。`id` は目次のアンカー先になる。目次に出すので平文で持つ */
  | { type: "heading2"; id: string; text: string }
  /** 節の中の小見出し。目次には出さないが、URL の `#id` で飛べるよう `id` を持つ */
  | { type: "heading3"; id: string; text: string }
  | { type: "bulletList"; items: ArticleListItem[] }
  /** `start` は 1 項目目の番号（`<ol start>`）。省略時は 1 */
  | { type: "numberedList"; start?: number; items: ArticleListItem[] }
  /** `filename` はリッチエディタのコードブロックに付けられるファイル名 */
  | { type: "code"; language?: string; filename?: string; code: string }
  | {
      type: "table";
      /** 見出し行が無い表は空配列 */
      headers: ArticleInline[][];
      rows: ArticleInline[][][];
    }
  /** pen の InfoCard (q6phow)。本文の途中に挟む囲みカード */
  | { type: "infoCard"; content: ArticleInline[] }
  | { type: "quote"; content: ArticleInline[] }
  | {
      type: "image";
      src: string;
      alt: string;
      width?: number;
      height?: number;
      caption?: string;
    }
  | { type: "divider" };
