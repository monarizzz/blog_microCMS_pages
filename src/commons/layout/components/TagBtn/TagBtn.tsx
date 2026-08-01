import Link from "next/link";

type Props = {
  text: string;
  link?: string;
};

const className =
  "bg-surface-container-low rounded-button text-secondary px-2 py-1";

const TagBtn = ({ text, link }: Props) =>
  link ? (
    <Link href={link} className={className}>
      #{text}
    </Link>
  ) : (
    <span className={className}>#{text}</span>
  );

export default TagBtn;
