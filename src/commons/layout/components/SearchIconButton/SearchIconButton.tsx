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
      className="flex items-center justify-center p-2.5"
    >
      <Search size={20} className="text-primary" />
    </Link>
  );
};

export default SearchIconButton;
