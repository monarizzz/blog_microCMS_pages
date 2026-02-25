import limitText from "@/features/blog/utils/limitText";
import Link from "next/link";

type Props = {
  name: string;
  maxLength?: number;
  isSelected: boolean;
  categoryId: string;
};

const TagButtonText = ({ name, maxLength, isSelected, categoryId }: Props) => {
  const text = `# ${limitText(name, maxLength)}`;
  const commonClass =
    "mx-0.5 rounded-3xl border border-slate-500 px-3 py-1.5 text-[0.625rem] font-bold tracking-widest text-slate-500";

  if (isSelected) {
    return <span className={commonClass}>{text}</span>;
  }
  return (
    <Link href={`/blog?cat=${categoryId}`} className={commonClass}>
      {text}
    </Link>
  );
};

export default TagButtonText;
