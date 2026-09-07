import ContentsRow from "@/commons/contents/components/ContentsRow/ContentsRow";
import CategorySectionHeader from "@/commons/contents/components/CategorySectionHeader/CategorySectionHeader";
import FilterBtn from "@/commons/button/components/FilterBtn/FilterBtn";
import PageHeader from "@/commons/other/components/PageHeader/PageHeader";
import SeeAllRight from "@/commons/other/components/SeeAllRight/SeeAllRight";

//TODO:仮置き
const categories = [
  { name: "Next.js", count: 12, shown: 3 },
  { name: "設計", count: 11, shown: 3 },
  { name: "TypeScript", count: 8, shown: 2 },
  { name: "テスト", count: 7, shown: 2 },
];

const totalCount = categories.reduce(
  (sum, category) => sum + category.count,
  0,
);

type Props = {
  activeTag?: string;
};

const TagsPageMain = ({ activeTag }: Props) => {
  return (
    <div className="mx-auto flex w-full max-w-275 flex-col gap-16 pt-37.5 pr-10 pb-24 pl-11.75">
      <PageHeader
        title="Tags"
        count={`${totalCount} 記事 / ${categories.length} カテゴリ`}
      />
      <div className="flex items-center gap-2 border-b border-outline-variant pb-6">
        <FilterBtn
          text="すべて"
          link="/tags"
          size="md"
          solid
          active={!activeTag}
        />
        {categories.map(({ name }) => (
          <FilterBtn
            key={name}
            text={`#${name}`}
            link={`/tags?tag=${encodeURIComponent(name)}`}
            size="md"
            solid
            active={activeTag === name}
          />
        ))}
      </div>
      <div className="flex flex-col gap-16">
        {categories.map((category, index) => (
          <section key={category.name} className="flex flex-col gap-2">
            <CategorySectionHeader
              name={category.name}
              count={`${category.count} 記事`}
              anchor={index === 0}
            />
            <div className="flex w-full flex-col">
              {Array.from({ length: category.shown }, (_, i) => (
                <ContentsRow key={i} />
              ))}
            </div>
            <div className="flex justify-end pt-5 pb-1">
              <SeeAllRight
                href={`/article?tag=${encodeURIComponent(category.name)}`}
                tag={{
                  name: category.name,
                  count: Math.max(0, category.count - category.shown),
                }}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TagsPageMain;
