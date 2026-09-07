"use client";

import { useEffect, useState } from "react";

import type { TocItem } from "../../types/tocItem";
import ArticleTocItem from "../ArticleTocItem/ArticleTocItem";

type Props = {
  items: TocItem[];
};

/**
 * 見出しを「読んでいる」と見なす帯。
 * 上端は Header の高さぶん外し、下端は 60% 削って
 * 画面上部に来た見出しだけが候補になるようにしている。
 */
const ACTIVE_ZONE_MARGIN = "-176px 0px -60% 0px";

const ArticleToc = ({ items }: Props) => {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);

  // items をそのまま依存にすると、親の再レンダーで配列の参照が変わるたびに
  // observer を張り直してしまう。中身が同じなら再実行しないよう文字列に畳む
  const idsKey = items.map(({ id }) => id).join(",");

  useEffect(() => {
    const ids = idsKey.length > 0 ? idsKey.split(",") : [];
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) {
      return;
    }

    // IntersectionObserver のコールバックは変化した要素しか渡さないため、
    // 現在交差している見出しはこちらで持ち続ける必要がある
    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        });

        // 帯に複数入ることがあるので、本文の並びで最も先頭のものを採る
        const currentId = ids.find((id) => visibleIds.has(id));

        if (currentId) {
          setActiveId(currentId);
        }
      },
      { rootMargin: ACTIVE_ZONE_MARGIN },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [idsKey]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="目次"
      className="flex w-full flex-col gap-4 rounded-xs border border-outline-variant bg-surface-container-low p-6"
    >
      <span className="text-sm font-medium tracking-[1.5px] text-secondary">
        目次
      </span>
      <ol className="flex w-full flex-col gap-3">
        {items.map(({ id, text }) => (
          <li key={id} className="w-full">
            <ArticleTocItem
              text={text}
              href={`#${id}`}
              active={id === activeId}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default ArticleToc;
