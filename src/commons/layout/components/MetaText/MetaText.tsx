import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MetaText = ({ children }: Props) => {
  return (
    <span className="font-mono text-sm tracking-wider text-secondary">
      {children}
    </span>
  );
};

export default MetaText;
