type Props = {
  className?: string;
};

const Divider = ({ className }: Props) => {
  return (
    <div className={`h-px w-full bg-outline-variant ${className ?? ""}`} />
  );
};

export default Divider;
