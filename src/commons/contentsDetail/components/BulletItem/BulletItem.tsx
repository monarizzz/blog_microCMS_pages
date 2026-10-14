import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BulletItem = ({ children }: Props) => {
  return (
    <div className="flex w-full items-start gap-4">
      <span className="text-md text-secondary">•</span>
      <p className="w-full text-md">{children}</p>
    </div>
  );
};

export default BulletItem;
