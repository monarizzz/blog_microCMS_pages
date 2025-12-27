import LayoutMain from "@/commons/layout/components/LayoutMain/LayoutMain";
import { useSession } from "next-auth/react";

const Custom404 = () => {
  const { data: session } = useSession();

  return (
    <LayoutMain session={session}>
      <main className="main">
        <p>ページがありません。</p>
      </main>
    </LayoutMain>
  );
};
export default Custom404;
