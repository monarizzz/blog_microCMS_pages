import { client } from "../../libs/client";
import Link from "next/link";
import styles from "./styles.module.css";
import Head from "next/head";

export async function getStaticProps() {
  const data = await client.get({ endpoint: "blog" });
  return {
    props: {
      blog: data.contents,
    },
  };
}

export default function Home({ blog }) {
  return (
    <div>
      <header>エンジニアブログ</header>
      {blog.map((blog) => (
        <div className="card">
          <h2>{blog.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
