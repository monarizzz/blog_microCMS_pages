import { ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

type Props = {
  children?: ReactNode;
};

const LayoutMain = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutMain;
