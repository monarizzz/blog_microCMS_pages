import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  cite?: string;
};

const Quote = ({ children, cite }: Props) => {
  return (
    <div className="border-l-[3px] border-outline py-1 pl-6">
      <div className="flex flex-col gap-2">
        <p className="text-lg italic leading-normal text-primary">
          {children}
        </p>
        {cite && (
          <p className="text-base text-on-surface-variant">{cite}</p>
        )}
      </div>
    </div>
  );
};

export default Quote;
