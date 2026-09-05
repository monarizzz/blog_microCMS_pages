import { Search } from "lucide-react";
import Link from "next/link";

type Props = {
  link: string;
  label?: string;
};

const SearchIconButton = ({ link, label = "検索" }: Props) => {
  return (
    <Link
      href={link}
      aria-label={label}
      className="flex size-10.25 items-center justify-center rounded-full border border-outline bg-surface"
    >
      <Search size={20} className="text-primary" />
    </Link>
  );
};

export default SearchIconButton;
