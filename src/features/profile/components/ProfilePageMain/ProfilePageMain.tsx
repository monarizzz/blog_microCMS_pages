import ArticleSectionHeading from "@/commons/contents/components/ArticleSectionHeading/ArticleSectionHeading";
import ImagePlaceholder from "@/commons/other/components/ImagePlaceholder/ImagePlaceholder";
import SectionLabel from "@/commons/other/components/SectionLabel/SectionLabel";
import Timeline from "@/commons/profile/components/Timeline/Timeline";
import { Profile } from "@/infra/microCMS/schema/profile";

type Props = {
  profile: Profile;
};

const ProfilePageMain = ({ profile, timeline }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-26.5 pt-37.5 pr-10 pb-24 pl-11.75">
      <section className="flex flex-col gap-16">
        <div className="flex w-full items-end justify-between gap-16">
          <div className="flex w-full flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tighter text-primary">
              {profile.name}
            </h1>
            <p className="w-130 leading-relaxed text-on-surface-variant">
              {profile.bio}
            </p>
          </div>
          <ImagePlaceholder
            label="PROFILE"
            className="h-74.5 w-96.5 shrink-0"
          />
        </div>
        <div className="flex w-119.75 flex-col gap-4">
          <SectionLabel>技術スタック</SectionLabel>
          <ul className="flex flex-col gap-2 px-0.5">
            {profile.tags.map((stack, i) => (
              <li
                key={i}
                className="font-mono text-[10px] text-on-surface-variant"
              >
                {stack.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* TimeLine */}
      <section className="flex flex-col">
        <ArticleSectionHeading
          title="Timeline"
          variant="timeline"
          showLinkIcon={false}
        />
        <Timeline items={timeline} />
      </section>
    </div>
  );
};

export default ProfilePageMain;
