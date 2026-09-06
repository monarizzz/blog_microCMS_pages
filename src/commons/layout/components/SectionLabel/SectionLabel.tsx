import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const SectionLabel = ({ children }: Props) => {
  return (
    // text-secondary は Tailwind の shadcn 由来トークン(ほぼ白)に解決されてしまい、
    // design-tokens.css の --color-secondary(#494e52, neutral-700)とは別物。
    // design-tokens.css は現状 globals.css / tailwind.config.ts に未接続のため、
    // 接続されるまでは実値を直接指定する。
    <span className="text-sm font-medium tracking-widest text-[#494e52]">
      {children}
    </span>
  );
};

export default SectionLabel;
