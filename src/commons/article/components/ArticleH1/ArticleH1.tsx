import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const ArticleH1 = ({ children }: Props) => {
  return (
    <h1 className="w-full border-b border-outline-variant pb-2 font-sans text-2xl font-bold tracking-snug text-primary">
      {children}
    </h1>
  );
};

export default ArticleH1;
