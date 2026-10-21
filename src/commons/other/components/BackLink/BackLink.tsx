import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import MetaText from "../MetaText/MetaText";

type Props = {
  text: string;
  link: string;
};

const BackLink = ({ text, link }: Props) => {
  return (
    <Link href={link} className="flex items-center gap-1.5">
      <ArrowLeft size={14} className="text-secondary" />
      <MetaText>{text}</MetaText>
    </Link>
  );
};

export default BackLink;
