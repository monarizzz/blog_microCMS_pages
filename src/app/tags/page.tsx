import LayoutMain from "@/features/layout/components/LayoutMain/LayoutMain";
import TagsPageMain from "@/features/tags/components/TagsPageMain/TagsPageMain";
import { getArticle } from "@/infra/microCMS/api/getArticle";
import { getTags } from "@/infra/microCMS/api/getTags";

const TagsPage = async () => {
  const tags = (await getTags()).contents;
  const articleList = tags.map((tag) => {
    const queries = `categories[contains]${tag.id}`;
    getArticle({ filters: queries });
  });

  console.log(articleList);
  // const activeTag = useSearchParams().get("tag");

  return (
    <LayoutMain>
      <TagsPageMain tags={tags} articleList={articleList} activeTag={null} />
    </LayoutMain>
  );
};

export default TagsPage;
