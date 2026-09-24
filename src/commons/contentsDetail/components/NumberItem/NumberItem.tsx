import { ReactNode } from "react";

type Props = {
  number: number;
  children: ReactNode;
};

const NumberItem = ({ number, children }: Props) => {
  return (
    <div className="flex w-full items-start gap-4">
      <span className="text-md font-medium text-secondary">{number}.</span>
      <p className="w-full text-md">{children}</p>
    </div>
  );
};

export default NumberItem;
