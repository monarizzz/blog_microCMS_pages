import IconBtn from "@/commons/layout/components/IconBtn/IconBtn";

type Props = {
  index: string;
  title: string;
  category: string;
  description: string;
  techStack: string;
  link: string;
};

const ProjectItem = ({
  index,
  title,
  category,
  description,
  techStack,
  link,
}: Props) => {
  return (
    <div className="flex w-full items-center gap-18">
      <div className="flex w-full flex-col gap-[9px] py-10">
        <span className="text-[12px] font-bold tracking-widest text-primary">
          {index}
        </span>
        <div className="flex w-full items-center gap-10 pt-3 pb-1">
          <div className="flex items-center gap-[17px]">
            <span className="text-lg font-bold tracking-wider text-primary">
              {title}
            </span>
            <span className="text-lg font-bold tracking-wider text-primary">
              ・
            </span>
            <span className="text-[16px] font-medium tracking-wider text-primary">
              {category}
            </span>
          </div>
          <div className="h-[1.5px] w-full bg-primary" />
        </div>
        <p className="w-full text-[12px] leading-[2] tracking-[0.3px] text-on-surface-variant">
          {description}
        </p>
        <div className="flex w-full justify-between gap-7">
          <div className="flex flex-col items-end gap-1">
            <span className="w-[190px] text-center font-mono text-[10px] text-on-surface-variant">
              {techStack}
            </span>
          </div>
          <IconBtn icon="arrowUpRight" link={link} label={`${title}を開く`} />
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
