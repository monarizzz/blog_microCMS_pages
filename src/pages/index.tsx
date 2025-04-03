import HomeMain from "@/features/blog/home/components/HomePageMain/HomePageMain";
import { client } from "../libs/microCMS/utils/client";
import { Blog } from "@/infra/microCMS/schema/Blog/blog";
import { NextPage } from "next";
import { BlogList } from "@/infra/microCMS/schema/Blog/blogList";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";

type Props = {
  blog: BlogList;
  category: CategoryList;
};

export const getServerSideProps = async () => {
  const data = await client.getList<Blog>({
    endpoint: "blog",
    queries: { limit: 15 },
  });
  const categoryData = await client.get({ endpoint: "categories" });
  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
    },
  };
};

const HomePage: NextPage<Props> = ({ blog, category }) => {
  return <HomeMain blog={blog} category={category} />;
};

export default HomePage;
