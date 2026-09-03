import Link from "next/link";
import { ChipSize, chipClassName } from "../../constants/chipStyle";

type Props = {
  text: string;
  link: string;
  size?: ChipSize;
  active?: boolean;
};

const FilterBtn = ({ text, link, size = "sm", active }: Props) => {
  const base = chipClassName(size);

  return (
    <Link
      href={link}
      aria-current={active ? "true" : undefined}
      className={
        active
          ? `${base} bg-surface-container-low text-primary`
          : `${base} text-secondary`
      }
    >
      {text}
    </Link>
  );
};

export default FilterBtn;
