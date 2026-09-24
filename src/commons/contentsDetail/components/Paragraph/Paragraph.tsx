import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Paragraph = ({ children }: Props) => {
  return <p className="text-md/relaxed">{children}</p>;
};

export default Paragraph;
