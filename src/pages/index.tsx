import HomeMain from "@/features/blog/home/components/HomePageMain/HomePageMain";
import { GetServerSideProps, NextPage } from "next";
import { BlogList } from "@/infra/microCMS/schema/Blog/blogList";
import { CategoryList } from "@/infra/microCMS/schema/Category/categoryList";
import { getBlogList } from "@/infra/microCMS/repositories/blog";
import { getCategoriesList } from "@/infra/microCMS/repositories/categories";

type Props = {
  blog: BlogList;
  category: CategoryList;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data = await getBlogList({ queries: { limit: 15 } });
  const categoryData = await getCategoriesList({ queries: { limit: 10 } });
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
