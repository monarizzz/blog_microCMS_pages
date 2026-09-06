"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

const ScrollNav = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollUp = () => {
    window.scrollBy({ top: -window.innerHeight, behavior: "smooth" });
  };

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="fixed right-8 bottom-8 z-10 flex w-24 flex-col items-center gap-6 rounded-sm border border-outline-variant bg-surface-container-low p-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="ページの先頭へ戻る"
        className="font-mono text-sm font-medium tracking-wider text-secondary"
      >
        TOP
      </button>
      <button type="button" onClick={scrollUp} aria-label="上へスクロール">
        <ChevronUp size={24} className="text-secondary" />
      </button>
      <button type="button" onClick={scrollDown} aria-label="下へスクロール">
        <ChevronDown size={24} className="text-secondary" />
      </button>
    </div>
  );
};

export default ScrollNav;
