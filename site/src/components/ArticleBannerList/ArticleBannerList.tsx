import { Article } from "@/types";
import { ArticleBanner } from "../common";
import { EditableArticleBanner } from "..";

// TODO: Find another way to handle which banner to show. I don't like 'editable' property
export const ArticleBannerList:React.FC<{
    data: Article[],
    className?: string,
    editable?: boolean
  }> = ({data, className, editable = false}) => {
    return (
      <div className={`flex flex-col ${className}`}>
          {
            data.length === 0
            ? <div className="text-lg font-medium text-gray">There are no articles yet.</div>
            : data?.map(article => 
              editable 
              ? <EditableArticleBanner key={article.id} data={article} />
              : <ArticleBanner key={article.id} data={article} />
            )
          }
      </div>
    );
  };