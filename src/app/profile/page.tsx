import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import ScrollNav from "@/commons/navigation/components/ScrollNav/ScrollNav";
import ProfilePageMain from "@/features/profile/components/ProfilePageMain/ProfilePageMain";
import { getProfile } from "@/infra/microCMS/api/getProfile";

export const metadata = buildPageMetadata({
  title: "プロフィール",
  description: "プロフィールと経歴",
  path: "/profile",
});

const Profile = async () => {
  const profile = await getProfile();

  return (
    <LayoutMain>
      <ProfilePageMain profile={profile} />
      <ScrollNav />
    </LayoutMain>
  );
};

export default Profile;
