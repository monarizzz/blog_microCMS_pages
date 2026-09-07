import { ReactNode } from "react";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";

const ArticleListLayout = ({ children }: { children: ReactNode }) => {
  return <LayoutMain>{children}</LayoutMain>;
};

export default ArticleListLayout;
