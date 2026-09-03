import Link from "next/link";
import { CHIP_CLASS_NAME } from "../../constants/chipStyle";

type Props = {
  text: string;
  link: string;
  active?: boolean;
};

const FilterBtn = ({ text, link, active }: Props) => (
  <Link
    href={link}
    aria-current={active ? "true" : undefined}
    className={
      active
        ? `${CHIP_CLASS_NAME} bg-surface-container-low text-primary`
        : `${CHIP_CLASS_NAME} text-secondary`
    }
  >
    {text}
  </Link>
);

export default FilterBtn;
