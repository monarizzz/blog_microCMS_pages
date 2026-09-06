import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SectionLabel = ({ children }: Props) => {
  return (
    <span className="text-sm font-medium tracking-widest text-secondary">
      {children}
    </span>
  );
};

export default SectionLabel;
