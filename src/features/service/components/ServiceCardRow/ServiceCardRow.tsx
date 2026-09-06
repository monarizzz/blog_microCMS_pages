import Divider from "@/commons/layout/components/Divider/Divider";
import ServiceCard from "@/features/service/components/ServiceCard/ServiceCard";

type ServiceItem = {
  title: string;
  role: string;
  stack: string;
  url?: string;
  github?: string;
};

type Props = {
  left: ServiceItem;
  right: ServiceItem;
};

const ServiceCardRow = ({ left, right }: Props) => {
  return (
    <div className="flex h-[362px] w-full gap-8 px-5">
      <div className="min-w-0 flex-1">
        <ServiceCard {...left} />
      </div>
      <div className="shrink-0">
        <Divider orientation="vertical" />
      </div>
      <div className="min-w-0 flex-1">
        <ServiceCard {...right} />
      </div>
    </div>
  );
};

export default ServiceCardRow;
