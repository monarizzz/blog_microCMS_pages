"use client";

import { Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  url: string;
  title?: string;
};

const ICON_BUTTON_CLASS_NAME =
  "flex size-11 items-center justify-center rounded-full border border-outline bg-surface";

const ShareBar = ({ url, title }: Props) => {
  const [copied, setCopied] = useState(false);

  const shareText = title ?? "";
  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url,
  )}&text=${encodeURIComponent(shareText)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボードAPIが使えない環境ではフォールバックせず何もしない
    }
  };

  return (
    <div className="flex items-center gap-4">
      <a
        href={xShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Xでシェア"
        className={ICON_BUTTON_CLASS_NAME}
      >
        <Image src="/x-mark.svg" alt="" width={16} height={16} aria-hidden />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "リンクをコピーしました" : "リンクをコピー"}
        className={ICON_BUTTON_CLASS_NAME}
      >
        <LinkIcon size={18} className="text-primary" />
      </button>
    </div>
  );
};

export default ShareBar;
