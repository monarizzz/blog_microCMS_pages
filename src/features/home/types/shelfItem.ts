import type { ComponentProps } from "react";

import type ShelfBook from "@/features/shelf/components/ShelfBook/ShelfBook";
import type ShelfNote from "@/features/shelf/components/ShelfNote/ShelfNote";

export type ShelfBookProps = ComponentProps<typeof ShelfBook>;
export type ShelfNoteProps = ComponentProps<typeof ShelfNote>;

/**
 * 棚に並ぶのは本（記事・制作物）とメモの 2 種類で、pen でも交互に差し込まれている。
 * 並び順ごと 1 つの配列で持ちたいので、判別可能なユニオンにした
 */
export type ShelfItem =
  | ({ kind: "book" } & ShelfBookProps)
  | ({ kind: "note" } & ShelfNoteProps);
