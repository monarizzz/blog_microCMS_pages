"use client";

import { Search, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MIN_QUERY_LENGTH } from "../../constants/searchQuery";

/** 入力が止まってから URL に反映するまでの待ち時間 (ms) */
const DEBOUNCE_MS = 300;

const buildSearchPath = (query: string) =>
  query ? `/search?q=${encodeURIComponent(query)}` : "/search";

type Props = {
  /** URL の `?q=` から渡される現在の検索クエリ */
  query?: string;
};

const SearchInput = ({ query = "" }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);
  // 自分が最後に URL へ送ったクエリ。URL 側の変化が自分由来かを見分けるために持つ
  const [lastSubmitted, setLastSubmitted] = useState(query);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const submit = useCallback(
    (next: string) => {
      if (next === lastSubmitted) return;
      setLastSubmitted(next);
      router.replace(buildSearchPath(next));
    },
    [lastSubmitted, router],
  );

  useEffect(() => {
    const trimmed = value.trim();
    // 空文字は「検索をやめた」とみなして反映する。1文字だけの状態は反映しない
    if (trimmed.length > 0 && trimmed.length < MIN_QUERY_LENGTH) return;
    if (trimmed === lastSubmitted) return;

    timerRef.current = setTimeout(() => submit(trimmed), DEBOUNCE_MS);
    return () => clearTimeout(timerRef.current);
  }, [value, lastSubmitted, submit]);

  // `?q=` が自分の router.replace 以外で変わったときだけ入力欄を追従させる。
  // 戻る / 進むと、結果なし画面の「検索をクリア」リンクの両方がここを通る
  // (Link のクライアント遷移では popstate が発火しないため prop の差分で見る)。
  // effect ではなくレンダー中に調整するのは、追従前の値で1フレーム描画させないため
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    if (query !== lastSubmitted) {
      setLastSubmitted(query);
      setValue(query);
    }
  }

  const handleClear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (trimmed.length > 0 && trimmed.length < MIN_QUERY_LENGTH) return;
        // 待機中のタイマーを消してから即時に送る。残すと同じクエリへの
        // router.replace が二重に走り、遷移とサーバーリクエストが重複する
        clearTimeout(timerRef.current);
        submit(trimmed);
      }}
      className="flex items-center gap-4 rounded-input px-4 py-3 outline outline-primary"
    >
      <Search size={20} className="text-secondary" />

      <div className="w-full">
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-label="記事を検索"
          placeholder="キーワードを入力"
          autoComplete="off"
          className="w-full text-base outline-none placeholder:text-secondary [&::-webkit-search-cancel-button]:hidden"
        />
      </div>
      <button
        type="button"
        aria-label="検索をクリア"
        onClick={handleClear}
        // 空のときに押しても何も起きないボタンは見せない
        className={value ? undefined : "invisible"}
      >
        <XIcon size={14} className="text-secondary" />
      </button>
    </form>
  );
};
export default SearchInput;
