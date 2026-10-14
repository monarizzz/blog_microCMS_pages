import { buildPageMetadata } from "@/commons/metadata/pageMetadata";
import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import ScrollNav from "@/commons/navigation/components/ScrollNav/ScrollNav";
import ProfilePageMain from "@/features/profile/components/ProfilePageMain/ProfilePageMain";
import { toTimelineItems } from "@/features/profile/toTimelineItems";
import { getAllExperiences } from "@/infra/microCMS/api/getAllExperiences";
import { getProfile } from "@/infra/microCMS/api/getProfile";

export const metadata = buildPageMetadata({
  title: "プロフィール",
  description: "プロフィールと経歴",
  path: "/profile",
});

const Profile = async () => {
  const [profile, experiences] = await Promise.all([
    getProfile(),
    getAllExperiences({ orders: "startDate" }),
  ]);

  return (
    <LayoutMain>
      <ProfilePageMain
        profile={profile}
        timeline={toTimelineItems(experiences, profile.milestones)}
      />
      <ScrollNav />
    </LayoutMain>
  );
};

export default Profile;
