import Link from "next/link";
import { CHIP_CLASS_NAME } from "../../constants/chipStyle";

type Props = {
  text: string;
  link: string;
  active?: boolean;
  size?: "sm" | "md";
  solid?: boolean;
};

const FilterBtn = ({ text, link, active, size = "sm", solid }: Props) => {
  const base =
    size === "md" ? "rounded-button px-4 py-2" : `${CHIP_CLASS_NAME}`;
  const state = active
    ? solid
      ? "bg-primary text-on-primary"
      : "bg-surface-container-low text-primary"
    : "text-secondary";

  return (
    <Link
      href={link}
      aria-current={active ? "true" : undefined}
      className={`${base} ${state}`}
    >
      {text}
    </Link>
  );
};

export default FilterBtn;
