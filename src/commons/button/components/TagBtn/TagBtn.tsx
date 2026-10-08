import { CHIP_CLASS_NAME } from "@/commons/other/constants/chipStyle";
import Link from "next/link";

type Props = {
  text: string;
  link: string;
  active?: boolean;
};

const className = `${CHIP_CLASS_NAME} bg-surface-container-low text-secondary`;

const TagBtn = ({ text, link, active }: Props) => {
  return (
    <Link
      href={link}
      className={
        active ? `${CHIP_CLASS_NAME} bg-primary text-on-primary` : className
      }
    >
      #{text}
    </Link>
  );
};

export default TagBtn;
