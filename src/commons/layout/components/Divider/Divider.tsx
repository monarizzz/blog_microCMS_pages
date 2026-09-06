type Props = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

const ORIENTATION_CLASS_NAME = {
  horizontal: "h-px w-full",
  vertical: "h-full w-px",
} as const;

const Divider = ({ orientation = "horizontal", className }: Props) => {
  return (
    <div
      className={`${ORIENTATION_CLASS_NAME[orientation]} bg-outline-variant ${className ?? ""}`}
    />
  );
};

export default Divider;
