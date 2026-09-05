import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ArticleH3 = ({ children }: Props) => {
  return (
    <h3 className="w-full font-sans text-lg font-bold tracking-normal text-primary">
      {children}
    </h3>
  );
};

export default ArticleH3;
