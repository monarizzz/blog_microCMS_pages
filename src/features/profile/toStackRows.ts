import type { MicroCMSListContent } from "microcms-js-sdk";

import type { Tags, Types } from "@/infra/microCMS/schema/tags";

type StackType = Exclude<Types, "トピック">;

const ROW_INDEX: Record<StackType, number> = {
  言語: 0,
  フレームワーク: 1,
  ライブラリ: 1,
  "その他・ツール類": 2,
};

/** タグを種別ごとの行にまとめ、行内の名前を " / " でつなぐ。空の行は返さない */
export const toStackRows = (tags: (Tags & MicroCMSListContent)[]): string[] => {
  const rows: string[][] = [[], [], []];
  const seenIds = new Set<string>();

  for (const tag of tags) {
    // 複数参照フィールドは同じタグを重ねて選べてしまい、名前が行に 2 回並ぶため
    if (seenIds.has(tag.id)) continue;
    seenIds.add(tag.id);

    // ServiceCard と同じく、トピック (記事用の分類) は技術スタックに出さない
    const type = tag.type.find(
      (candidate): candidate is StackType => candidate !== "トピック",
    );
    if (type === undefined) continue;

    rows[ROW_INDEX[type]].push(tag.name);
  }

  return rows.filter((row) => row.length > 0).map((row) => row.join(" / "));
};
