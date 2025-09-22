import { NextPage } from "next";
import { ArticleNavigation } from "@/infra/schema/Blog/articleNavigation";
import PageNavigationButton from "./PageNavButton/PageNavButton";
import styles from "./PageNavMain.module.scss";
import { PAGE_NAV } from "@/libs/utils/article/pageNav";

type Props = {
  articleNavigation: ArticleNavigation;
};

const PageNavMain: NextPage<Props> = ({ articleNavigation }) => {
  const next = {
    title: articleNavigation.nextArticle?.title,
    id: articleNavigation.nextArticle?.id,
    text: PAGE_NAV.NEXT,
    style: undefined,
  };

  const back = {
    title: articleNavigation.prevArticle?.title,
    id: articleNavigation.prevArticle?.id,
    text: PAGE_NAV.BACK,
    style: "scaleX(-1)",
  };

  return (
    <div className={styles.root}>
      {articleNavigation.prevArticle && <PageNavigationButton status={back} />}
      {articleNavigation.nextArticle && <PageNavigationButton status={next} />}
    </div>
  );
};

export default PageNavMain;
