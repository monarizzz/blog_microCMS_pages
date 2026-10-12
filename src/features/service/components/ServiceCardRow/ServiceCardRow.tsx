import ServiceCard from "@/features/service/components/ServiceCard/ServiceCard";

import type { ServiceRow } from "../../types/ServiceCard";

type Props = {
  services: ServiceRow;
};

const ServiceCardRow = ({ services }: Props) => {
  const [first, second] = services;

  return (
    // 1 件のときもカード幅を 2 件のときと揃えるため、カラムを固定した grid にする
    <div className="grid w-full grid-cols-[1fr_1px_1fr] gap-8 px-5">
      <ServiceCard service={first} />
      {/* 縦線は 2 件目があるときのみ*/}
      {second && <div className="bg-outline-variant" />}
      {second && <ServiceCard service={second} />}
    </div>
  );
};

export default ServiceCardRow;
