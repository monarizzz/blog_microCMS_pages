import { Category } from "@/libs/schema/contents/Category/category";
import TagButtonText from "../TagButtonText/TagButtonText";

export type Props = {
  category: Category[];
  maxLength?: number;
};

const TagButton = ({ category, maxLength }: Props) => {
  return (
    <div className="h-[1.6875rem]">
      {category.slice().map((category) => (
        <TagButtonText
          key={category.id}
          name={category.name}
          maxLength={maxLength}
          categoryId={category.id}
        />
      ))}
    </div>
  );
};

export default TagButton;
