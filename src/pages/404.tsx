import Commonlayout from "@/commons/layout/Layout/CommonLayout";
import { useSession } from "next-auth/react";

const Custom404 = () => {
  const { data: session } = useSession();

  return (
    <Commonlayout session={session}>
      <main className="main">
        <p>ページがありません。</p>
      </main>
    </Commonlayout>
  );
};
export default Custom404;
