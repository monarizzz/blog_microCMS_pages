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
        role="checkbox"
        aria-checked={checked}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-outline ${
          checked ? "bg-primary" : "bg-surface"
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
