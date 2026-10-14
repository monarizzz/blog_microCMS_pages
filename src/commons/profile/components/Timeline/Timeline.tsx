import ProjectItem from "@/commons/profile/components/ProjectItem/ProjectItem";
import TimelineMarker from "@/commons/profile/components/TimelineMarker/TimelineMarker";

export type TimelineProject = {
  index: string;
  title: string;
  category: string;
  description: string;
  techStack: string;
  // 実 URL が繋がるまでは省略する（渡すとリンク先の無いボタンが出てしまう）
  link?: string;
};

export type TimelineItem = {
  id: string;
  year: string;
  // project を持つ行は目盛り側に見出しを出さない（右の ProjectItem が見出しを兼ねる）
  title?: string;
  size?: "sm" | "lg";
  project?: TimelineProject;
};

type Props = {
  items: TimelineItem[];
};

const Timeline = ({ items }: Props) => {
  return (
    <div className="relative flex flex-col gap-5 pt-24">
      {/* 目盛りを貫く縦軸。pen では左端から 174px の位置に置かれている */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-43.5 mt-22 w-0.5 bg-on-surface-variant"
      />
      {items.map((item) => (
        <div key={item.id} className="relative flex items-start">
          {/* 縦軸の中心 (175px) を目盛り列の右端に合わせる。TimelineMarker 側でドットが半径分はみ出す */}
          <div className="w-43.75 shrink-0">
            <TimelineMarker
              year={item.year}
              title={item.title}
              size={item.size}
              hollow={Boolean(item.project)}
            />
          </div>
          {/*
            pl は縦軸の中心から ProjectItem までの 29px。
            border-box では padding が max-w に含まれるため、
            ProjectItem の表示幅 (582 - 4 = 578px) を保つよう max-w も 25px 広げる。
          */}
          {item.project && (
            <div className="w-full max-w-151.75 pl-7.25">
              <ProjectItem {...item.project} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
