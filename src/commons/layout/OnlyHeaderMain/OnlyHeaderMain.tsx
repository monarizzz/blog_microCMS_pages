import { NextPage } from "next";
import { ReactNode } from "react";
import Header from "@/features/Layout/Header/Header";

type Props = {
  children: ReactNode;
};

const OnlyHeaderMain: NextPage<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
export default OnlyHeaderMain;
