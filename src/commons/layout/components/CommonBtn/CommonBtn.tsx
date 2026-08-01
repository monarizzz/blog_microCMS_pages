import Link from "next/link";

type Props = {
  text: string;
  link: string;
};

const CommonBtn = ({ text, link }: Props) => {
  return (
    <Link
      href={`${link}`}
      className="bg-surface-container-low rounded-button text-secondary px-2 py-1"
    >
      #{text}
    </Link>
  );
};

export default CommonBtn;
