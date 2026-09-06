import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  cite?: string;
};

const Quote = ({ children, cite }: Props) => {
  return (
    <blockquote className="border-l-[3px] border-outline py-1 pl-6">
      <div className="flex flex-col gap-2">
        <p className="text-lg leading-normal text-primary italic">{children}</p>
        {cite && (
          <cite className="text-base text-on-surface-variant not-italic">
            {cite}
          </cite>
        )}
      </div>
    </blockquote>
  );
};

export default Quote;
