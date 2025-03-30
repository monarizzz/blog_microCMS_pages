import Link from "next/link";

const Commonlayout = ({ children }) => {
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
