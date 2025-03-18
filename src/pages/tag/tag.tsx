import { client } from "../../../libs/client";
import styles from "./tag.module.css";
import { useRouter } from "next/router";
import TagButton from "../../components/tag/TagButton";
import BlogCard from "@/components/page/Index/BlogCard";
import { resolve } from "path";
import { useEffect } from "react";
import { Blog } from "@/infra/microCMS/schema/blog";

export async function getStaticProps() {
  const categoryData = await client.getList<Blog>({ endpoint: "categories" });

  const blogDataByC1i23mx3nnd4 = await client.getList({
    endpoint: "blog",
    queries: { limit: 3, filters: "categories[contains]71i23mx3nnd4" },
  });
  const blogDataBy3nh90zdxu2aj = await client.getList({
    endpoint: "blog",
    queries: { limit: 3, filters: "categories[contains]3nh90zdxu2aj" },
  });
  const blogDataBy6ww6y6noq2b = await client.getList({
    endpoint: "blog",
    queries: { limit: 3, filters: "categories[contains]6ww6y6noq2b" },
  });
  return {
    props: {
      category: categoryData.contents,
      blog: blogDataByC1i23mx3nnd4.contents,
      blog1: blogDataBy3nh90zdxu2aj.contents,
      blog2: blogDataBy6ww6y6noq2b.contents,
    },
  };
}

export default function Home({ blog, category }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>タグページ</div>
      <div className={styles.tagButton}>{TagButton({ category })}</div>
      {blog.map((blog) => BlogCard({ blog }))}
      {/* {useRouter().query["id"] ? <div>filter</div> : null} */}
    </div>
  );
}
// export function BlogListGroup({ blog, category }) {
//   return category
//     .slice()
//     .reverse()
//     .map((category) => (
//     //  BlogList
//     ));
// }

{
  /* <div key={category.id}>
<Link
  href={`./tag/?id=${category.id}`}
  className={styles.tag}
  key={category.name}
>
  {category.name}
</Link>
{console.log(blog.categories)}
{blog.categories ? <div>tag</div> : <div>none</div>}
</div> */
}

//  "blog.map((blog) => blogContents({ blog }))"
// export function BlogListGroup({ blog, category }) {
//   return blog.map((blog) => (
//     <div>
//       {blog.categories.length > 0 ? (
//         blogContents({ blog })
//       ) : (
//         <>
//           <div>タグ未設定</div>
//           {blogContents({ blog })}
//         </>
//       )}
//     </div>
//   ));
// }

// API のフィルター
// const data = await client.get({
//   endpoint: "blog",
//   queries: { limit: 3, filters: "categories[contains]" + categoryData.id },
// });
// return {
//   props: {
//     blog: data.contents
//   },
// };
// }
