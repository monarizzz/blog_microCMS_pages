import { Check } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  checked: boolean;
  children: ReactNode;
};

const Checkbox = ({ checked, children }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <span
        className={`flex size-5 shrink-0 items-center justify-center rounded-sm border-outline ${
          checked ? "border bg-primary" : "border-[1.5px] bg-surface"
        }`}
      >
        {checked && (
          <Check
            aria-hidden
            className="size-3.5 text-on-primary"
            strokeWidth={3}
          />
        )}
        <span className="sr-only">{checked ? "完了" : "未完了"}</span>
      </span>
      <span
        className={`text-md ${checked ? "text-on-surface-variant" : "text-on-surface"}`}
      >
        {children}
      </span>
    </div>
  );
};

export default Checkbox;
