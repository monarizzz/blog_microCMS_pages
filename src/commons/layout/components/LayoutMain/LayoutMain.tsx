import { ReactNode } from "react";
import Header from "@/commons/layout/components/Header/Header";
import Footer from "../Footer/Footer";
import { pageList } from "../../constants/pageList";

type Props = {
  children?: ReactNode;
};

const LayoutMain = ({ children }: Props) => {
  return (
    <>
      <Header pageList={pageList} />
      {children}
      <div></div>
      <Footer pageList={pageList} />
    </>
  );
};

export default LayoutMain;
