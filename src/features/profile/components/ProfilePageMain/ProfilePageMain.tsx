import ArticleSectionHeading from "@/commons/contents/components/ArticleSectionHeading/ArticleSectionHeading";
import ImagePlaceholder from "@/commons/other/components/ImagePlaceholder/ImagePlaceholder";
import SectionLabel from "@/commons/other/components/SectionLabel/SectionLabel";
import ProjectItem from "@/commons/profile/components/ProjectItem/ProjectItem";
import TimelineMarker from "@/commons/profile/components/TimelineMarker/TimelineMarker";

type TimelineProject = {
  index: string;
  title: string;
  category: string;
  description: string;
  techStack: string;
  // 実 URL が繋がるまでは省略する（渡すとリンク先の無いボタンが出てしまう）
  link?: string;
};

type TimelineItem = {
  id: string;
  year: string;
  // project を持つ行は目盛り側に見出しを出さない（右の ProjectItem が見出しを兼ねる）
  title?: string;
  size?: "sm" | "lg";
  project?: TimelineProject;
};

//TODO:仮置き
const profile = {
  name: "Ccc",
  bio: "情報系の大学生 フロント中心に開発してます",
  stacks: [
    "TypeScript",
    "Next.js(App・Pages) / React",
    "GitHub / Vercel / Clip Studio Paint / Live2D Cubism / Blender",
  ],
};

//TODO:仮置き
const timeline: TimelineItem[] = [
  { id: "clip-studio-paint", year: "2020", title: "Clip Studio Paint" },
  { id: "blender", year: "2021", title: "Blender" },
  { id: "live2d-cubism", year: "2022", title: "Live2D Cubism" },
  { id: "nextjs", year: "2024", title: "Next.js / TypeScript", size: "lg" },
  {
    id: "blog",
    year: "2025.09",
    project: {
      index: "01",
      title: "ブログサイト",
      category: "個人開発",
      description:
        "コラボレーション、スピード感、柔軟性、そしてイノベーティブな発想を、品質・コスト・スケジュール・スコープに意識を集中し、ストーリーのある活動的なビジュアルを表現します。",
      techStack: "Next.js / TypeScript / microCMS",
    },
  },
  {
    id: "teamlab",
    year: "2025.09",
    project: {
      index: "02",
      title: "チームラボ",
      category: "インターン",
      description:
        "コラボレーション、スピード感、柔軟性、そしてイノベーティブな発想を、品質・コスト・スケジュール・スコープに意識を集中し、ストーリーのある活動的なビジュアルを表現します。",
      techStack: "Next.js / TypeScript / SCSS / StoryBook",
    },
  },
];

const ProfilePageMain = () => {
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
            {profile.stacks.map((stack) => (
              <li
                key={stack}
                className="font-mono text-[10px] text-on-surface-variant"
              >
                {stack}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-col">
        <ArticleSectionHeading
          title="Timeline"
          variant="timeline"
          showLinkIcon={false}
        />
        <div className="relative flex flex-col gap-12 pt-24">
          {/* 目盛りを貫く縦軸。pen では左端から 174px の位置に置かれている */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-43.5 w-0.5 bg-on-surface-variant"
          />
          {timeline.map((item) => (
            <div key={item.id} className="relative flex items-start">
              <div className="w-50 shrink-0">
                <TimelineMarker
                  year={item.year}
                  title={item.title}
                  size={item.size}
                  hollow={Boolean(item.project)}
                />
              </div>
              {item.project && (
                <div className="w-full max-w-145.5 pl-1">
                  <ProjectItem {...item.project} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePageMain;
