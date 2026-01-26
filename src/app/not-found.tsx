"use client";

import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
import { useSession } from "next-auth/react";

// TODO:session
const NotFound = () => {
  // const { data: session } = useSession();

  return (
    // <LayoutMain session={session}>
    <main className="main">
      <p>ページがありません。</p>
    </main>
    // </LayoutMain>
  );
};
export default NotFound;
