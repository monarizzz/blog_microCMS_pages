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

  const submit = useCallback(
    (next: string) => {
      if (next === query) return;
      router.replace(buildSearchPath(next));
    },
    [query, router],
  );

  useEffect(() => {
    const trimmed = value.trim();
    // 空文字は「検索をやめた」とみなして反映する。1文字だけの状態は反映しない
    if (trimmed.length > 0 && trimmed.length < MIN_QUERY_LENGTH) return;
    if (trimmed === query) return;

    const timer = setTimeout(() => submit(trimmed), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [value, query, submit]);

  // 戻る / 進むで `?q=` が変わったときに入力欄を追従させる。
  // query prop の変化を見ると自分の router.replace でも発火し、打ちかけの文字を
  // 上書きしてしまうため、履歴操作だけを拾う popstate を購読する
  useEffect(() => {
    const syncFromUrl = () => {
      setValue(new URLSearchParams(window.location.search).get("q") ?? "");
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

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
