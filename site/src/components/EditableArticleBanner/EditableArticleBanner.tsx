"use client";

import { Article } from "@/types";
import { ArticleBanner } from "../common";
import Link from "next/link";

const deleteArticle = async (articleId: number) => {
    // const response = await fetch(`http://localhost:8080/api/articles/${articleId}`, {
    //     method: 'DELETE'
    // }).then(response => response.json());

}

export const EditableArticleBanner:React.FC<{data: Article}> = ({data}) => {
    return (
      <div className="flex flex-row w-full">
        <ArticleBanner data={data} />
        <div className="flex flex-col border-l border-light-gray">
          <Link href={`/write/${data.id}`} className="w-full h-full px-2 flex justify-center items-center">Edit</Link>
          <button className="w-full h-full px-2" onClick={() => deleteArticle(data.id)}>Delete</button>
        </div>
      </div>
    );
  };