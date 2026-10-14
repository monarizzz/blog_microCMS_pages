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
    // 全件取得なので、本文 (description) や画像などタイムラインで使わない項目は落とす。
    // toTimelineItems で項目を増やすときはここにも足すこと
    getAllExperiences({
      orders: "startDate",
      fields: "id,title,kind,summary,startDate,tags.name,tags.type",
    }),
  ]);

  return (
    <LayoutMain>
      <ProfilePageMain
        profile={profile}
        timeline={toTimelineItems(experiences)}
      />
      <ScrollNav />
    </LayoutMain>
  );
};

export default Profile;
