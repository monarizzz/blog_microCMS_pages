import { client } from "../../../libs/client";
import Link from "next/link";
import styles from "./articlePage.module.css";
import dayjs from "dayjs";
import TagButton from "@/commons/tag/TagButton/TagButton";

export async function getStaticProps(context) {
  const articlePageId = context.params.articlePageId;
  const data = await client.get({ endpoint: "blog", contentId: articlePageId });
  const categoryData = await client.get({ endpoint: "categories" });
  return {
    props: {
      blog: data,
      category: categoryData.contents,
    },
  };
}

export async function getStaticPaths() {
  const data = await client.get({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/articlePage/${content.id}`);
  return {
    paths,
    fallback: false,
  };
}

export default function Home({ blog, category }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{blog.title}</h2>
      {TagButton({ category })}
      <span className={styles.date}>
        {dayjs(blog.publishedAt).format("YYYY/MM/DD HH:mm")}
      </span>
      <div className={styles.card}>
        <div
          className={styles.article}
          dangerouslySetInnerHTML={{
            __html: blog.body,
          }}
        />
        <Link href="/" className={styles.link}>
          <span>← 記事一覧に戻る</span>
        </Link>
        <span className={styles.date}>
          {blog.publishedAt != blog.revisedAt
            ? dayjs(blog.revisedAt).format("YYYY/MM/DD HH:mm") + " " + "更新"
            : null}
        </span>
      </div>
    </div>
  );
}
