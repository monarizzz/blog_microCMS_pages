import Link from "next/link";

export default function Commonlayout({ children }) {
  return (
    <>
      <header>
        <Link href="/">ブログ</Link>
      </header>
      <main>{children}</main>
    </>
  );
}
