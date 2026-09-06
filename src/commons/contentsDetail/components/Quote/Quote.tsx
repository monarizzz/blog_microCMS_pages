import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  cite?: ReactNode;
};

const Quote = ({ children, cite }: Props) => {
  return (
    <figure className="flex flex-col gap-2 border-l-[3px] border-outline py-1 pl-6">
      <blockquote>
        <p className="text-lg/normal text-primary italic">{children}</p>
      </blockquote>
      {cite && (
        <figcaption className="text-base text-on-surface-variant">
          {cite}
        </figcaption>
      )}
    </figure>
  );
};

export default Quote;
