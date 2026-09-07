import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import ScrollNav from "@/commons/navigation/components/ScrollNav/ScrollNav";
import ProfilePageMain from "@/features/profile/components/ProfilePageMain/ProfilePageMain";

export const metadata = buildPageMetadata({
  title: "プロフィール",
  description: "運営者のプロフィールと経歴です。",
  path: "/profile",
});

const Profile = () => {
  return (
    <>
      <LayoutMain>
        <ProfilePageMain />
      </LayoutMain>
      <ScrollNav />
    </>
  );
};

export default Profile;
