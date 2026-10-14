/** 本文中の文字装飾。pen の Blocks Catalog `InlineRow` (Hveyn) に並ぶもの */
export type InlineMark = "bold" | "italic" | "strike" | "underline" | "code";

/**
 * 本文の 1 区間。同じ装飾・同じリンク先の文字列を 1 つにまとめた単位で、
 * 段落はこれを並べて表す。改行は `text` 内の `\n` で持つ。
 *
 * 入れ子の木にしないのは、Storybook の args にそのまま書け、
 * テストで期待値を並べやすいため。装飾の組み合わせは `marks` で表せる。
 */
export type ArticleInline = {
  text: string;
  marks?: InlineMark[];
  /** リンク先。変換の段階で http(s) / mailto / サイト内パスだけに絞ってある */
  href?: string;
};
