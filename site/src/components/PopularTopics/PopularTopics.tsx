import { CategoryTag } from "../common";

export const PopularTopics:React.FC<{className?: string}> = ({className}) => {
    return (
      <div className={className}>
        <h3 className="text-base font-medium mb-4">Popular Topics:</h3>
        <div className="flex flex-wrap gap-2">
          <CategoryTag className="font-medium p-2">Lifestyle</CategoryTag>
          <CategoryTag className="font-medium p-2">Travel</CategoryTag>
          <CategoryTag className="font-medium p-2">Technology</CategoryTag>
          <CategoryTag className="font-medium p-2">Education</CategoryTag>
          <CategoryTag className="font-medium p-2">Recipe</CategoryTag>
          <CategoryTag className="font-medium p-2">Design</CategoryTag>
        </div>
      </div>
    );
  };