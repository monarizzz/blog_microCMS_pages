import { ReactNode } from "react";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return <LayoutMain>{children}</LayoutMain>;
};

export default HomeLayout;
