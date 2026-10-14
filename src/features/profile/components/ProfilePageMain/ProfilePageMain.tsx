import Image from "next/image";

import ArticleSectionHeading from "@/commons/contents/components/ArticleSectionHeading/ArticleSectionHeading";
import ImagePlaceholder from "@/commons/other/components/ImagePlaceholder/ImagePlaceholder";
import SectionLabel from "@/commons/other/components/SectionLabel/SectionLabel";
import Timeline, {
  TimelineItem,
} from "@/commons/profile/components/Timeline/Timeline";
import { Profile } from "@/infra/microCMS/schema/profile";

type Props = {
  profile: Profile;
  timeline: TimelineItem[];
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
          {profile.image ? (
            <div className="relative h-74.5 w-96.5 shrink-0 overflow-hidden">
              {/* 直前の h1 に名前があり、microCMS の画像フィールドは代替テキストを
                  持たない。「〇〇のプロフィール画像」と機械的に付けても h1 の繰り返しで
                  画像の中身は伝わらないため、装飾扱いで alt は空にする。
                  枠は固定幅 (w-96.5 = 386px) なので sizes もその値。
                  next/image で最適化するため、next.config.ts の images.remotePatterns に
                  登録されたホスト (microCMS) か、public 配下のパスのみ渡せる */}
              <Image
                src={profile.image.url}
                alt=""
                fill
                sizes="386px"
                className="object-cover"
              />
            </div>
          ) : (
            <ImagePlaceholder
              label="PROFILE"
              className="h-74.5 w-96.5 shrink-0"
            />
          )}
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
