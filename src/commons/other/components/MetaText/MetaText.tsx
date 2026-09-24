import { ReactNode } from "react";

type Size = "sm" | "xs";

type Props = {
  children: ReactNode;
  size?: Size;
};

// xs の tracking は pen の letterSpacing 1.5 を正とするため任意値のまま残す
const SIZE_CLASS_NAME: Record<Size, string> = {
  sm: "text-sm tracking-wider",
  xs: "text-2xs tracking-[1.5px]",
};

const MetaText = ({ children, size = "sm" }: Props) => {
  return (
    <span className={`font-mono text-secondary ${SIZE_CLASS_NAME[size]}`}>
      {children}
    </span>
  );
};

export default MetaText;
