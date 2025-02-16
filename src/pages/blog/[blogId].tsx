import { client } from "../../../libs/client";
import Link from "next/link";
import styles from "./blog.module.css";

export async function getStaticProps(context) {
  const blogId = context.params.blogId;
  const data = await client.get({ endpoint: "blog", contentId: blogId });
  return {
    props: {
      blog: data,
    },
  };
}

export async function getStaticPaths() {
  const data = await client.get({ endpoint: "blog" });
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths,
    fallback: false,
  };
}

export default function Home({ blog }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>{blog.title}</h2>
        <div
          className={styles.article}
          dangerouslySetInnerHTML={{
            __html: `${blog.body}`,
          }}
        />
        <Link href="/">
          <span className={styles.link}>← 記事一覧に戻る</span>
        </Link>
      </div>
    </div>
  );
}
