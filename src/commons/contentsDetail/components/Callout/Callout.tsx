import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: ReactNode;
  emoji?: string;
};

const Callout = ({ children, title, emoji = "💡" }: Props) => {
  return (
    <aside className="flex gap-4 rounded-md bg-surface-container-low px-6 py-4">
      <span aria-hidden className="text-lg text-primary">
        {emoji}
      </span>
      <div className="flex flex-1 flex-col gap-1">
        {title && <p className="text-md font-bold text-primary">{title}</p>}
        <p>{children}</p>
      </div>
    </aside>
  );
};

export default Callout;
