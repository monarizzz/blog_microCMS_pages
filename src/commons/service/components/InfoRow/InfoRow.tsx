import MetaText from "@/commons/other/components/MetaText/MetaText";

type Props = {
  label: string;
  value: string;
};

const InfoRow = ({ label, value }: Props) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <MetaText size="xs">{label}</MetaText>
      <span className="w-full text-[13px] font-medium text-on-surface">
        {value}
      </span>
    </div>
  );
};

export default InfoRow;
