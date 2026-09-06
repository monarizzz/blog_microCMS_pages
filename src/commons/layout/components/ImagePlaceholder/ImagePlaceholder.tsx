import { Image as ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  label?: string;
  className?: string;
};

const ImagePlaceholder = ({ label = "NO IMAGE", className }: Props) => {
  return (
    <div
      className={cn(
        "border-outline-variant bg-surface-container-low flex h-[220px] w-full flex-col items-center justify-center gap-2.5 overflow-hidden border",
        className,
      )}
    >
      <ImageIcon size={30} className="text-on-surface-variant" />
      <span className="font-mono text-2xs text-on-surface-variant tracking-[2px]">
        {label}
      </span>
    </div>
  );
};

export default ImagePlaceholder;
