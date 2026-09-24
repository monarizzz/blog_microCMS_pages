import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
};

const Toggle = ({ summary, children, defaultOpen = false }: Props) => {
  return (
    <details
      open={defaultOpen}
      className="group w-full rounded-md bg-surface-container-low px-6 py-4"
    >
      <summary className="flex w-full cursor-pointer list-none items-center gap-2 text-left [&::-webkit-details-marker]:hidden">
        <ChevronRight
          aria-hidden
          size={16}
          className="shrink-0 text-secondary transition-transform group-open:rotate-90"
        />
        <span className="text-md font-bold text-primary">{summary}</span>
      </summary>
      <div className="mt-2 w-full text-md/normal text-on-surface">
        {children}
      </div>
    </details>
  );
};

export default Toggle;
