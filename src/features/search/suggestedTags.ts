/** 検索結果が無いときに提示するタグの数。仮置きで並べていた件数に合わせた */
export const SUGGESTED_TAG_COUNT = 4;

/**
 * 記事ごとのタグ名から、付いている記事の多い順にタグを選ぶ。
 * 同数のときは先に現れたタグを優先する（新しい順の記事を渡せば、最近使われたタグが先になる）。
 *
 * 1 記事の中で同じタグが重なっていても 1 と数える。
 * 複数参照は同じタグを重ねて選べるため、そのまま数えると件数が水増しされる
 */
export const pickSuggestedTags = (
  tagNamesPerArticle: string[][],
  count = SUGGESTED_TAG_COUNT,
): string[] => {
  const articleCounts = new Map<string, number>();

  for (const tagNames of tagNamesPerArticle) {
    for (const name of new Set(tagNames)) {
      articleCounts.set(name, (articleCounts.get(name) ?? 0) + 1);
    }
  }

  // Array.prototype.sort は安定ソートなので、同数なら Map への挿入順 (= 初出順) が残る
  return [...articleCounts]
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([name]) => name);
};
