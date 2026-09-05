"use client";

import { ChevronRight } from "lucide-react";
import { useState, type ReactNode } from "react";

type Props = {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
};

const Toggle = ({ summary, children, defaultOpen = false }: Props) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="flex w-full flex-col gap-2 rounded-md bg-surface-container-low px-6 py-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center gap-2 text-left"
      >
        <ChevronRight
          size={16}
          className={`shrink-0 text-secondary transition-transform ${
            open ? "rotate-90" : ""
          }`}
        />
        <span className="text-md font-bold text-primary">{summary}</span>
      </button>
      {open && (
        <p className="w-full text-md leading-normal text-on-surface">
          {children}
        </p>
      )}
    </div>
  );
};

export default Toggle;
