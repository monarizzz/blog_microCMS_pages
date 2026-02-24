import Link from "next/link";
import { HEADER } from "@/libs/utils/header";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

const Header = ({ session }: Props) => {
  return (
    <div className="flex w-full justify-between p-3 shadow">
      <Link
        href="/"
        className="my-auto ml-8 inline text-left text-2xl font-bold text-gray-600"
      >
        {HEADER.TITLE}
      </Link>

      <span className="mx-3 my-auto flex">
        {session ? (
          <Link
            href="/edit"
            className="relative rounded-sm px-1.5 py-1 text-left text-base font-bold text-gray-500 hover:bg-gray-100"
          >
            {HEADER.EDIT}
          </Link>
        ) : null}
        <Link
          href="/"
          className="relative rounded-sm px-1.5 py-1 text-left text-base font-bold text-gray-500 hover:bg-gray-100"
        >
          {HEADER.HOME}
        </Link>
        <Link
          href="/blog"
          className="relative rounded-sm px-1.5 py-1 text-left text-base font-bold text-gray-500 hover:bg-gray-100"
        >
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
