import Link from "next/link";

const WEIGHT_CLASS_NAME = {
  light: "font-light",
  medium: "font-medium",
} as const;

type Props = {
  /** 与えると next/link のリンクになる。省略時は文字だけ（Footer の使い方） */
  href?: string;
  /** pen のインスタンス差。Header は light (300) / Footer は medium (500) */
  weight?: keyof typeof WEIGHT_CLASS_NAME;
};

const Logo = ({ href, weight = "light" }: Props) => {
  const className = `text-xl tracking-tight text-primary ${WEIGHT_CLASS_NAME[weight]}`;

  if (href === undefined) {
    return <span className={className}>Monelog</span>;
  }

  return (
    <Link href={href} className={className}>
      Monelog
    </Link>
  );
};

export default Logo;
