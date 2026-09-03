import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { pageList } from "../../constants/pageList";

type Props = {
  children?: ReactNode;
};

const LayoutMain = ({ children }: Props) => {
  return (
    <>
      <Header pageList={pageList} />
      <main>{children}</main>
      <Footer pageList={pageList} />
    </>
  );
};

export default LayoutMain;
