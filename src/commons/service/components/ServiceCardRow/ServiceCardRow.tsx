import { Fragment } from "react";

import ServiceCard, {
  type ServiceCardProps,
} from "@/commons/service/components/ServiceCard/ServiceCard";

type Props = {
  services: ServiceCardProps[];
};

const ServiceCardRow = ({ services }: Props) => {
  return (
    <div className="flex w-full gap-8 px-5">
      {services.map((service, index) => (
        <Fragment key={service.title}>
          {index > 0 && <div className="w-px shrink-0 bg-outline-variant" />}
          <ServiceCard {...service} />
        </Fragment>
      ))}
    </div>
  );
};

export default ServiceCardRow;
