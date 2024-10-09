import { Article } from "@/types";
import { ArticleBanner } from "..";

export const ArticleBannerList:React.FC<{data: Article[], className?: string}> = ({data, className}) => {
    return (
      <div className={`flex flex-col ${className}`}>
          {
            data?.map(article => 
              <ArticleBanner key={article.id} data={article}/>
            )
          }
      </div>
    );
  };