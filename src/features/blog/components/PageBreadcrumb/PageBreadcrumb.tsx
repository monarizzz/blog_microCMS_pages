import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";

type item = {
  label: string;
  href: string;
};

type Props = {
  items: item[];
  current: string;
};

const PageBreadcrumb = ({ items, current }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item) => (
          <Fragment key={item.label}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.href}> {item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
