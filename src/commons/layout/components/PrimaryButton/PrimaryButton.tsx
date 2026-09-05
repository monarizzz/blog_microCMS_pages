import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  label: string;
  href?: string;
  onClick?: () => void;
};

const CLASS_NAME =
  "flex items-center justify-center gap-2 rounded-button bg-primary py-3.5 px-7 text-base font-medium text-on-primary";

const PrimaryButton = ({ label, href, onClick }: Props) => {
  const content = (
    <>
      <ArrowLeft size={16} className="text-on-primary" />
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={CLASS_NAME}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={CLASS_NAME}>
      {content}
    </button>
  );
};

export default PrimaryButton;
