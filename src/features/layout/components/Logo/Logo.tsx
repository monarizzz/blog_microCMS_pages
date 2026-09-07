import Link from "next/link";

/* pen の Logo (VD5vy) は fontWeight 300。@theme が --font-*: initial で
   ウェイトの名前空間を潰しているため font-light が無く、任意値で書いている */
const WEIGHT_CLASS_NAME = {
  light: "font-[300]",
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
