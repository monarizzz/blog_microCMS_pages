type Props = {
  orientation?: "horizontal" | "vertical";
};

const Divider = ({ orientation = "horizontal" }: Props) => {
  return (
    <div
      className={
        orientation === "vertical"
          ? "h-full w-px bg-outline-variant"
          : "h-px w-full bg-outline-variant"
      }
    />
  );
};

export default Divider;
