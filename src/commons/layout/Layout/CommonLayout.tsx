import { NextPage } from "next";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Commonlayout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <header>
        <Link href="/">ブログ</Link>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Commonlayout;
