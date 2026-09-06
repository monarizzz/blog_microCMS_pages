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
      className="relative inline-flex size-5 items-center justify-center before:absolute before:-inset-2.5 before:content-['']"
    >
      <Search size={20} className="text-primary" />
    </Link>
  );
};

export default SearchIconButton;
