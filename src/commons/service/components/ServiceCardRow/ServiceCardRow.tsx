import { Fragment } from "react";

import ServiceCard, {
  type ServiceCardProps,
} from "@/commons/service/components/ServiceCard/ServiceCard";

export type ServiceCardRowItem = ServiceCardProps & {
  /** 一意で安定した ID。title は重複しうるため key には使わない */
  id: string;
};

type Props = {
  services: ServiceCardRowItem[];
};

const ServiceCardRow = ({ services }: Props) => {
  return (
    <div className="flex w-full gap-8 px-5">
      {services.map(({ id, ...service }, index) => (
        <Fragment key={id}>
          {index > 0 && <div className="w-px shrink-0 bg-outline-variant" />}
          <ServiceCard {...service} />
        </Fragment>
      ))}
    </div>
  );
};

export default ServiceCardRow;
