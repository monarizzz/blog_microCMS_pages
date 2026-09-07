import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";

export const metadata = buildPageMetadata({
  title: "プロフィール",
  description: "運営者のプロフィールと経歴です。",
  path: "/profile",
});

const Home = () => {
  return (
    <>
      <LayoutMain>
        <>profile page</>
      </LayoutMain>
    </>
  );
};

export default Home;
