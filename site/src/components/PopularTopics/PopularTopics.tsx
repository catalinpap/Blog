import { CategoryTag } from "../common";

export const PopularTopics = () => {
    return (
      <>
        <h3 className="text-base font-medium mb-4">Popular Topics:</h3>
        <div className="flex flex-wrap gap-2">
          <CategoryTag className="bg-light-gray text-black font-medium p-2">Lifestyle</CategoryTag>
          <CategoryTag className="bg-light-gray text-black font-medium p-2">Travel</CategoryTag>
          <CategoryTag className="bg-light-gray text-black font-medium p-2">Technology</CategoryTag>
          <CategoryTag className="bg-light-gray text-black font-medium p-2">Education</CategoryTag>
          <CategoryTag className="bg-light-gray text-black font-medium p-2">Recipe</CategoryTag>
          <CategoryTag className="bg-light-gray text-black font-medium p-2">Design</CategoryTag>
        </div>
      </>
    );
  };