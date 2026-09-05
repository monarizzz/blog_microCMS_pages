import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const InfoLabel = ({ children }: Props) => {
  return (
    <span className="font-mono text-2xs tracking-[1.5px] text-secondary">
      {children}
    </span>
  );
};

export default InfoLabel;
