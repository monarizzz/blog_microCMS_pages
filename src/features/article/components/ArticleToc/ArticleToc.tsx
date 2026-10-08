"use client";

import { useEffect, useState } from "react";

import type { TocItem } from "../../types/tocItem";
import ArticleTocItem from "../ArticleTocItem/ArticleTocItem";

type Props = {
  items: TocItem[];
};

/**
 * 「ここを読んでいる」と見なす画面上の高さ。
 * Header (176px) の下端に合わせてある。
 */
const ACTIVE_LINE = 176;

/** ページ下端に着いたと見なす許容差。小数の丸めで 1px 足りないことがある */
const BOTTOM_TOLERANCE = 2;

const ArticleToc = ({ items }: Props) => {
  const [activeId, setActiveId] = useState<string | undefined>(items[0]?.id);

  // items をそのまま依存にすると、親の再レンダーで配列の参照が変わるたびに
  // 購読を張り直してしまう。中身が同じなら再実行しないよう文字列に畳む。
  // 区切り文字で連結すると id 自体に区切り文字が入ったときに壊れるため JSON にする
  const idsKey = JSON.stringify(items.map(({ id }) => id));

  useEffect(() => {
    const ids: string[] = JSON.parse(idsKey);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) {
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;

      // 最後の節は、本文が短いと基準線まで上がりきらないまま
      // ページ下端に着いてしまう。読み終えている以上そこを差したい
      const isAtPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - BOTTOM_TOLERANCE;

      if (isAtPageBottom) {
        setActiveId(targets[targets.length - 1].id);
        return;
      }

      // 基準線を通り過ぎた最後の見出しが現在位置。
      // 1 つも通っていない（本文の先頭にいる）ときは先頭の見出しを差す
      const passed = targets.filter(
        (target) => target.getBoundingClientRect().top <= ACTIVE_LINE,
      );

      setActiveId((passed.at(-1) ?? targets[0]).id);
    };

    const handleScroll = () => {
      // スクロール中に毎回測ると重いので 1 フレームにまとめる
      if (frame === 0) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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
