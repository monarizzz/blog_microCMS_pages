import { Image as ImageIcon } from "lucide-react";

type Props = {
  label?: string;
  className?: string;
};

const ImagePlaceholder = ({ label = "NO IMAGE", className = "" }: Props) => {
  return (
    <div
      className={`flex h-[220px] w-full flex-col items-center justify-center gap-2.5 border border-outline-variant bg-surface-container-low ${className}`}
    >
      <ImageIcon size={30} className="text-on-surface-variant" />
      <span className="font-mono text-2xs tracking-[2px] text-on-surface-variant">
        {label}
      </span>
    </div>
  );
};

export default ImagePlaceholder;
