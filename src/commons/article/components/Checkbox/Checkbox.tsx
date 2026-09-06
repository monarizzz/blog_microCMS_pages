import { Check } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  checked: boolean;
  children: ReactNode;
};

const Checkbox = ({ checked, children }: Props) => {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-readonly
      className="flex items-center gap-4"
    >
      <span
        aria-hidden
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-outline ${
          checked ? "border bg-primary" : "border-[1.5px] bg-surface"
        }`}
      >
        {checked && (
          <Check className="h-3.5 w-3.5 text-on-primary" strokeWidth={3} />
        )}
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
