import ServiceCard, {
  type ServiceCardProps,
} from "@/commons/service/components/ServiceCard/ServiceCard";

export type ServiceCardRowItem = ServiceCardProps & {
  /** 一意で安定した ID。title は重複しうるため key には使わない */
  id: string;
};

/** 1 行は 1 件または 2 件。3 件以上は表示できないため型で弾く */
export type ServiceCardRowServices =
  | readonly [ServiceCardRowItem]
  | readonly [ServiceCardRowItem, ServiceCardRowItem];

type Props = {
  services: ServiceCardRowServices;
};

const ServiceCardRow = ({ services }: Props) => {
  const [first, second] = services;

  return (
    // 1 件のときもカード幅を 2 件のときと揃えるため、カラムを固定した grid にする
    <div className="grid w-full grid-cols-[1fr_1px_1fr] gap-8 px-5">
      <ServiceCard {...first} />
      {/* 縦線は 2 件目があるときのみ*/}
      {second && <div className="bg-outline-variant" />}
      {second && <ServiceCard {...second} />}
    </div>
  );
};

export default ServiceCardRow;
