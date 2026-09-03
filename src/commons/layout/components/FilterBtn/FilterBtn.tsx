import Link from "next/link";
import { CHIP_CLASS_NAME } from "../../constants/chipStyle";

type Props = {
  text: string;
  link: string;
  active?: boolean;
  /** md は記事一覧のソート行のように余白を広く取る置かれ方（ui.pen: padding 6 / 12） */
  size?: "sm" | "md";
};

const FilterBtn = ({ text, link, active, size = "sm" }: Props) => (
  <Link
    href={link}
    aria-current={active ? "true" : undefined}
    className={`${size === "md" ? "rounded-button px-3 py-1.5" : CHIP_CLASS_NAME} ${
      active ? "bg-surface-container-low text-primary" : "text-secondary"
    }`}
  >
    {text}
  </Link>
);

export default FilterBtn;
