import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MetaText = ({ children }: Props) => {
  return (
    <span className="text-secondary font-mono text-sm tracking-wider">
      {children}
    </span>
  );
};

export default MetaText;
