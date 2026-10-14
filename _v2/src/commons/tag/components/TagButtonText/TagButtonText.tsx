import limitText from "@/features/blog/utils/limitText";
import Link from "next/link";

type Props = {
  name: string;
  maxLength?: number;
  categoryId: string;
};

const TagButtonText = ({ name, maxLength, categoryId }: Props) => {
  const text = `# ${limitText(name, maxLength)}`;
  const commonClass =
    "mx-0.5 rounded-3xl border border-slate-500 px-3 py-1.5 text-2xs font-bold tracking-widest text-slate-500";

  return (
    <Link
      href={`/blog?cat=${categoryId}`}
      className={`${commonClass} hover:bg-slate-500 hover:text-white`}
    >
      {text}
    </Link>
  );
};

export default TagButtonText;
