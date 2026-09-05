import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ArticleH2 = ({ children }: Props) => {
  return (
    <h2 className="w-full font-sans text-xl font-bold tracking-[-0.2px] text-primary">
      {children}
    </h2>
  );
};

export default ArticleH2;
