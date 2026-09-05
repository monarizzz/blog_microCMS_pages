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
      <ServiceCard {...left} />
      <Divider orientation="vertical" />
      <ServiceCard {...right} />
    </div>
  );
};

export default ServiceCardRow;
