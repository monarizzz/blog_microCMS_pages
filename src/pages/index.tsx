import HomeMain from "@/features/blog/home/HomePageMain/HomePageMain";
import { client } from "../../libs/client";
import { Blog } from "@/infra/microCMS/schema/blog";

type Props = {
  blog: Blog;
};

export const getServerSideProps = async () => {
  const data = await client.getList<Blog>({
    endpoint: "blog",
    queries: { limit: 15 },
  });
  return {
    props: {
      blog: data.contents,
    },
  };
};

const HomePage: React.FC<Props> = ({ blog }) => {
  return <HomeMain blog={blog} />;
};

export default HomePage;
