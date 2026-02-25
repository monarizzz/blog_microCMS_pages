import Link from "next/link";
import { HEADER } from "@/libs/utils/header";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const Header = ({ session }: Props) => {
  const rightBtn =
    "relative rounded-sm px-1.5 py-1 text-left text-sm font-bold text-gray-500 hover:bg-gray-100";
  return (
    <div className="flex w-full justify-between pb-1 pt-6 shadow">
      <Link
        href="/"
        className="my-auto ml-[3vw] text-2xl font-bold text-gray-600"
      >
        {HEADER.TITLE}
      </Link>
      <span className="my-auto mr-[3vw] flex">
        {session ? (
          <Link href="/edit" className={rightBtn}>
            {HEADER.EDIT}
          </Link>
        ) : null}
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
