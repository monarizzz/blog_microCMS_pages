import Divider from "@/commons/other/components/Divider/Divider";
import PageHeader from "@/commons/other/components/PageHeader/PageHeader";
import ServiceCardRow from "@/features/service/components/ServiceCardRow/ServiceCardRow";

import type { ServiceList, ServiceRow } from "../../types/ServiceCard";

type Props = {
  services: readonly ServiceList[];
};

const ROW_SIZE = 2;

// ServiceCardRow が 1 行 1〜2 件のタプルしか受け付けないため、slice の結果を
// そのままではなく件数を絞り込んだ形で渡す
const toRows = (services: readonly ServiceList[]): ServiceRow[] =>
  Array.from({ length: Math.ceil(services.length / ROW_SIZE) }, (_, index) => {
    const [first, second] = services.slice(
      index * ROW_SIZE,
      (index + 1) * ROW_SIZE,
    );

    return second ? [first, second] : [first];
  });

const ServicePageMain = ({ services }: Props) => {
  const serviceRows = toRows(services);

  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-9.5 pt-37.5 pr-10 pb-24 pl-11.75">
      <PageHeader
        title="Service"
        sub="これまでに開発したものまとめ"
        count={`${services.length} プロジェクト`}
        wide
      />
      <section className="flex flex-col gap-6">
        <div className="h-3.25 w-full border-b border-outline-variant" />
        <div className="flex flex-col gap-8">
          {serviceRows.map((row, index) => (
            <div key={row[0].id} className="flex flex-col gap-8">
              {index > 0 && (
                <div className="flex w-full items-center gap-16.25">
                  <Divider className="flex-1" />
                  <Divider className="flex-1" />
                </div>
              )}
              <ServiceCardRow services={row} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicePageMain;
