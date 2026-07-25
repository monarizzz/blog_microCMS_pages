import { BlogNavigation } from "../../types/blogNavigation";
import PageNavBtn from "../PageNavBtn/PageNavBtn";

type Props = {
  blogNavigation: BlogNavigation;
};

const PageNav = ({ blogNavigation }: Props) => {
  const { backBlog, nextBlog } = blogNavigation;

  return (
    <div className="flex gap-x-6">
      <PageNavBtn content={backBlog} isNext={false} />
      <PageNavBtn content={nextBlog} isNext={true} />
    </div>
  );
};

export default PageNav;
