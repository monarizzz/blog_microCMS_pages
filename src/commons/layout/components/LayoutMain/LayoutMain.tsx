import { ReactNode } from "react";
import Header from "@/commons/layout/components/Header/Header";
import GithubBtn from "@/commons/layout/components/GithubBtn/GithubBtn";

type Props = {
  children?: ReactNode;
};

const LayoutMain = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      {/* TODO:いつかヘッダーへ移動させる */}
      <div className="bottom-4 right-4 fixed">
        <GithubBtn />
      </div>
    </>
  );
};

export default LayoutMain;
