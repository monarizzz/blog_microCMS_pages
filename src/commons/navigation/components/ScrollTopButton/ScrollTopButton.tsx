"use client";

import { ChevronUp } from "lucide-react";

const ScrollTopButton = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="ページの先頭へ戻る"
      className="flex size-16 flex-col items-center justify-center gap-1 rounded-sm"
    >
      <span aria-hidden className="h-0.75 w-5.5 rounded-full bg-outline" />
      <ChevronUp aria-hidden size={30} className="text-outline" />
    </button>
  );
};

export default ScrollTopButton;
