import Link from "next/link";
import { HEADER } from "@/libs/utils/header";

const rightBtn =
  "relative rounded-sm px-1.5 py-1 text-left text-sm font-bold text-gray-500 hover:bg-gray-100";

const Header = () => {
  return (
    <div className="flex w-full justify-between pb-1 pt-6 shadow">
      <Link
        href="/"
        className="my-auto ml-[3vw] text-2xl font-bold text-gray-600"
      >
        {HEADER.TITLE}
      </Link>
      <span className="my-auto mr-[3vw] flex">
        <Link href="/" className={rightBtn}>
          {HEADER.HOME}
        </Link>
        <Link href="/blog" className={rightBtn}>
          {HEADER.CATEGORY}
        </Link>
        {/* <Link href="/about">
          <span className={styles.button}>{HEADER.ABOUT}</span>
        </Link> */}
      </span>
    </div>
  );
};

export default Header;
