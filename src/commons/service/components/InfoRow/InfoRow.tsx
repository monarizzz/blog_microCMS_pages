type Props = {
  label: string;
  value: string;
};

const InfoRow = ({ label, value }: Props) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <span className="font-mono text-2xs tracking-[1.5px] text-secondary">
        {label}
      </span>
      <span className="w-full text-[13px] font-medium text-on-surface">
        {value}
      </span>
    </div>
  );
};

export default InfoRow;
