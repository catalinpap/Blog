import { Article } from "@/types";
import { Card } from "../common";


export const CardGrid: React.FC<{data: Article[]}> = ({data}) => {
    return (
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {
            data.length === 0
            ? <p className="text-lg font-light text-gray">There are no articles yet.</p>
            : data?.map(article => <Card key={article.id} data={article}/>)
          }
        </div>
    );
};