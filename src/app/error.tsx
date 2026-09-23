"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, TriangleAlert } from "lucide-react";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: Props) => {
  // 本番ではエラー内容がクライアントへ渡らない（digest だけになる）ため、
  // 少なくとも digest がコンソールに残るようにしておく
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <LayoutMain>
      <div className="mx-auto flex w-full max-w-275 flex-col items-center gap-6 px-10 py-16">
        <TriangleAlert size={70} strokeWidth={1.5} />
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-xl font-bold">問題が発生しました。</h1>
          <p className="text-base">
            一時的な不具合の可能性があります。時間をおいて再度お試しください。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="flex items-center justify-center gap-2 rounded-button bg-primary px-7 py-3.5 text-on-primary"
        >
          <RotateCcw size={16} />
          <span>再試行</span>
        </button>
        <Link href="/" className="text-base text-on-surface-variant underline">
          ホームに戻る
        </Link>
      </div>
    </LayoutMain>
  );
};

export default ErrorPage;
